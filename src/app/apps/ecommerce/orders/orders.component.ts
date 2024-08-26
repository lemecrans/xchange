import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { ORDERSLIST } from '../shared/data';
import { Order } from '../shared/ecommerce.model';
import { Utilisateur } from 'src/app/shared/models/utilisateur.model';
import { PropositionEchangeService } from 'src/app/shared/services/proposition-echange.service';
import { PropositionEchange } from 'src/app/shared/models/propositionEchange.model';
import { Objet } from 'src/app/shared/models/objet.model';
import { AuthenticationService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-ecommerce-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  orderList: Order[] = [];
  selectAll: boolean = false;
  propositionStatus: string = "All";
  loading: boolean = false;
  columns: Column[] = [];
  currentUser! : any
  propositions : PropositionEchange[] = []
  myPropositions : PropositionEchange[] = []
  proposantObjet : Objet[] = []
  destinataireObjet : Objet[] = []
  objetEchanges : Objet[] = []
  isLoading : boolean = true

  @ViewChild('advancedTable') advancedTable: any;


  constructor (private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer,private propositionEchangeService: PropositionEchangeService,private authenticationService: AuthenticationService) { }
  ngOnInit(): void {
    this.pageTitle = [{ label: 'Proposition', path: '/' }, { label: 'Liste des propositions', path: '/', active: true }];

    this.getAllPropositions()
  }

  /**
   *  fetches order list
   */
  _fetchData(): void {
    this.orderList = ORDERSLIST;
  }

  getAllPropositions(){
    const currentUser = this.authenticationService.currentUser();
    if(currentUser!=null){
      this.currentUser = currentUser
    }
    
    this.propositionEchangeService.getAllProposition().subscribe({
      next: (propositions) => {
        this.propositions = propositions;
        this.filterPropositions()

      },
      error: (err) => {
        console.error('Erreur lors de la récupération des propositions:', err);
      },
      complete: () => {
        this.initTableData()
        this.isLoading = false
        console.log('La récupération des propositions est terminée.');
      }
    });
  }

  private filterPropositions(): void {
    if (this.currentUser.id === undefined) return;

    this.myPropositions = this.propositions.filter(proposition =>
      proposition.proposant.id === this.currentUser.id ||
      proposition.destinataire.id === this.currentUser.id
    );
  }


  initTableData(): void {
    this.columns = [
      {
        name: 'Proposant',
        label: 'Proposant',
        formatter: this.proposantFormatter.bind(this),
      },
      {
        name: 'Objets proposés',
        label: 'Objets Proposés',
        formatter: this.objetsEchangesFormatter.bind(this),
      },
      {
        name: 'Destinataire',
        label: 'Destinataire',
        formatter: this.destinataireFormatter.bind(this)
      },
      {
        name: 'ObjetDestinataire',
        label: 'Objets Destinataire',
        formatter: this.objetsDestinataireFormatter.bind(this)
      },
      {
        name: 'Statut',
        label: 'Statut',
        formatter: this.statutFormatter.bind(this)
      },
      {
        name: 'Date',
        label: 'Date',
        formatter: this.datePropositionFormatter.bind(this)
      },
      {
        name: 'Action',
        label: 'Action',
        sort: false,
        formatter: this.orderActionFormatter.bind(this)
      }];
  }


  /**
   *  handles operations that need to be performed after loading table
   */
  handleTableLoad(event: any): void {
    document.querySelectorAll('.validerButton').forEach((button) => {
      button.addEventListener('click', () => this.validerEchange(button));
    });

    document.querySelectorAll('.voirProposition').forEach((button) => {
      button.addEventListener('click', () => this.openMap(button));
    });

    document.querySelectorAll('.propositions').forEach((e) => {
      e.addEventListener("click", () => {
        this.router.navigate(['../proposition/details'], { relativeTo: this.route, queryParams: { id: e.id } })
      });
    })
  }

  proposantFormatter(proposition: PropositionEchange): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<a href="javascript:void(0)" class="order text-body " id="${proposition.proposant.username}">${proposition.proposant.username}</a> `
    );
  }

  destinataireFormatter(proposition: PropositionEchange): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<a href="javascript:void(0)" class="order text-body " id="${proposition.destinataire.username}">${proposition.destinataire.username}</a> `
    );
  }

  objetsEchangesFormatter(proposition: PropositionEchange): any {
    let propositions: string = ``;
    for (let i = 0; i < proposition.objetsEchanges.length; i++) {
      if(proposition.proposant.id===proposition.objetsEchanges[i].objet.proprietaire.id){
        propositions += `<p>${proposition.objetsEchanges[i].objet.nom}</p>`
      }
      //products += `<a href="javascript:void(0)"><img src="${proposition.objetsEchanges[i].nom}" alt="product-img" height="32" /></a>`
    }
    return this.sanitizer.bypassSecurityTrustHtml(propositions);
  }

  objetsDestinataireFormatter(proposition: PropositionEchange): any {
    let propositions: string = ``;
    for (let i = 0; i < proposition.objetsEchanges.length; i++) {
      //products += `<a href="javascript:void(0)"><img src="${proposition.objetsEchanges[i].nom}" alt="product-img" height="32" /></a>`
      if(proposition.destinataire.id===proposition.objetsEchanges[i].objet.proprietaire.id){
        propositions += `<p>${proposition.objetsEchanges[i].objet.nom}</p>`
      }
    }
    return this.sanitizer.bypassSecurityTrustHtml(propositions);
  }

  // formats payment status cell
  statutFormatter(proposition: PropositionEchange): any {
    if (proposition.etat == "Validé") {
      return this.sanitizer.bypassSecurityTrustHtml(
        `<h5><span class="badge bg-soft-success text-success"><i class="mdi mdi-bitcoin"></i>Accepté</span></h5>`
      );
    }
    else if (proposition.etat == "En attente") {
      return this.sanitizer.bypassSecurityTrustHtml(
        `<h5><span class="badge bg-soft-warning text-warning"><i class="mdi mdi-timer-sand"></i>En attente</span></h5>`
      );
    }
    else if (proposition.etat == "Payment Failed") {
      return this.sanitizer.bypassSecurityTrustHtml(
        ` <h5><span class="badge bg-soft-danger text-danger"><i class="mdi mdi-cancel"></i> Payment Failed</span></h5>`
      );
    }
    else {
      return this.sanitizer.bypassSecurityTrustHtml(
        `<h5><span class="badge bg-soft-info text-info"><i class="mdi mdi-cash"></i> Cash On Delivery</span></h5>`
      );
    }

  }

  datePropositionFormatter(proposition: PropositionEchange){
    return this.sanitizer.bypassSecurityTrustHtml(
      `${proposition.dateProposition}`
    );
  }


  // action cell formatter
  orderActionFormatter(proposition: PropositionEchange): any {
    let propositions: string = `<a href="javascript:void(0);" class="action-see voirProposition" value="`+proposition.id+`"> <i class="mdi mdi-eye"></i></a>`;
    if(proposition.destinataire.id===this.currentUser.id && proposition.etat==='En attente'){
      propositions+=`<a href="javascript:void(0);"  value="`+proposition.id+`" class="action-icon validerButton"> <i class="mdi mdi-check-circle""></i></a>`
    }
    if(proposition.etat!=='Validé'){
      propositions+=`<a href="javascript:void(0);" id="delete" class="action-icon"> <i class="mdi mdi-delete"></i></a>`
    } 
    return this.sanitizer.bypassSecurityTrustHtml(
      propositions
    )

  }

  validerEchange(button:any){
    this.propositionEchangeService.validerProposition(button.getAttribute('value')).subscribe({
      next: (response:any) => {
        alert('Échange validé avec succès!')
        window.location.reload()
      }
    });
  }

  openMap(idObjet:any){
    let id = idObjet.getAttribute('value')

    this.router.navigate(['/apps/objet/map'], { queryParams: { id } });
  }


  /**
 * Match table data with search input
 * @param row Table row
 * @param term Search the value
 */
  matches(row: PropositionEchange, term: string) {
    return row.etat?.toLowerCase().includes(term)
      
  }

  /**
   * Search Method
  */
  searchData(searchTerm: string): void {
    if (searchTerm === '') {
      this.getAllPropositions();
    }
    else {
      let updatedData = this.propositions;
      //  filter
      updatedData = updatedData.filter(proposition => this.matches(proposition, searchTerm));
      this.propositions = updatedData;
    }

  }



  /**
   * change order status group
   * @param OrderStatusGroup order status
   */
  changePropositionStatus(propositionStatus: string): void {
    this.loading = true;
    let updatedData = this.propositions;

    updatedData = propositionStatus === "All" ? this.propositions : [...this.propositions].filter((o) => o.etat?.includes(propositionStatus))
    this.propositions = updatedData;
    if(propositionStatus==='All'){
      this.getAllPropositions()
    }
    setTimeout(() => {
      this.loading = false;
    }, 400);
  }



}
