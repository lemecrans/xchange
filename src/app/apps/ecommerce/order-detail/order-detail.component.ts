import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { ORDERSLIST } from '../shared/data';
import { Order, OrderDetails } from '../shared/ecommerce.model';
import { ObjetService } from '../../../shared/services/objet.service';
import { AuthenticationService } from 'src/app/core/service/auth.service';
import { Objet } from '../../../shared/models/objet.model';
import { PropositionEchangeService } from '../../../shared/services/proposition-echange.service';
import { Utilisateur } from '../../../shared/models/utilisateur.model';

@Component({
  selector: 'app-ecommerce-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];

  selectedOrder!: Order;
  orderDetails!: OrderDetails;

  myObjets: Objet[] = []
  destinataireObjet: any[] = []

  myObjetEchange : Objet[] = []
  destinaireEchange : Objet[] = []

  objetEchange! : any
  objetDestinaire! : any

  idAEchanger: number[] = [];  
  idMyObjet: number[] = []

  latitude: number | null = null;
  longitude: number | null = null;
  errorMessage: string | null = null;

  destinataire! : Utilisateur
  currentUser! : any 
  idObjetDestinataire! : number

  isLoading : boolean = true
  isLoadingMyObjet : boolean = true

  constructor (private route: ActivatedRoute, private ObjetService: ObjetService, private propositionService:PropositionEchangeService ,private authenticationService: AuthenticationService,private router:Router) { }

  ngOnInit(): void {
    this.getCurrentPosition()
    
    this.pageTitle = [{ label: 'Proposition', path: '/' }, { label: 'Proposer un echange', path: '/', active: true }];

    this.route.queryParams.subscribe(params => {
      if (params && params.hasOwnProperty('id')) {
        
        this.idObjetDestinataire = +params['id']
        this.idAEchanger.push(this.idObjetDestinataire)
        this.getObjetById(this.idObjetDestinataire)
      }
    });
  }

  getMyObjets(id:any){
    this.ObjetService.getObjectByUser(id).subscribe({
      next: (response: any) => {
        this.myObjets = response

        this.myObjets = response.map((item: Objet) => ({
          ...item,
          image: `data:image/png;base64,${item.image}`
        }));
      },
      error: (err: any) => {
        console.error('Erreur lors de la récupération des objets:', err);
      },
      complete: () => {
        this.isLoadingMyObjet = false
        console.log('Requête terminée.');
      }
    });
  }

  getCurrentPosition(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          console.log(`Latitude: ${this.latitude}, Longitude: ${this.longitude}`);
        },
        (error) => {
          
          console.error(this.errorMessage);
        }
      );
    } else {
      alert('Obligatoire!')
      window.location.reload()
    }
  }

  getObjetsDestinataire(id:any){
    this.ObjetService.getObjectByUser(id).subscribe({
      next: (response: any) => {
        this.objetDestinaire = response
        this.destinataire = response[0].proprietaire
        this.objetDestinaire = response.map((item: Objet) => ({
          ...item,
          image: `data:image/png;base64,${item.image}`
        }));
        const currentUser = this.authenticationService.currentUser();
        this.currentUser = currentUser
    if (currentUser?.id !== undefined) {
      this.getMyObjets(currentUser?.id.toString())
    }
      },
      error: (err: any) => {
        console.error('Erreur lors de la récupération des objets:', err);
      },
      complete: () => {
        this.isLoading = false
        console.log('Requête terminée.');
      }
    });
  }

  getObjetById(id: any): void {
    this.ObjetService.getObjectById(id).subscribe({
      next: (response: any) => {
        this.objetEchange = response
        this.getObjetsDestinataire(this.objetEchange.proprietaire.id)
      },
      error: (err: any) => {
        console.error('Erreur lors de la récupération de l\'objet:', err);
      },
      complete: () => {
        
        console.log('Requête de récupération d\'objet terminée.');
      }
    });
  }

  

  onCheckboxChangeAEchanger(event: any, id: number): void {
    if (event.target.checked) {
      if (!this.idAEchanger.includes(id)) {
        this.idAEchanger.push(id);
      }
    } else {
      const index = this.idAEchanger.indexOf(id);
      if (index !== -1) {
        this.idAEchanger.splice(index, 1);
      }
    }
  }

  isChecked(id: any): boolean {
    return id == this.idObjetDestinataire|| this.idAEchanger.includes(id)
  }

  isDisabled(id: any): boolean {
    return id == this.idObjetDestinataire;
  }

  onCheckboxChange(event: Event, id: number): void {
    const target = event.target as HTMLInputElement;
    if (!this.isDisabled(id)) {
      if (target.checked) {
        this.idAEchanger.push(id);
      } else {
        this.idAEchanger = this.idAEchanger.filter(objId => objId !== id);
      }
    }
  }

  onCheckBoxChangeMyObjet(event: Event, id: number): void {
    const target = event.target as HTMLInputElement;
    if (!this.isDisabled(id)) {
      if (target.checked) {
        this.idMyObjet.push(id);
      } else {
        this.idMyObjet = this.idMyObjet.filter(objId => objId !== id);
      }
    }
  }


  creerProposition() {
    if(this.idMyObjet.length<=0){
      alert('Choisissez au moins un objet')
      return
    }
    this.idAEchanger = this.idAEchanger.concat(this.idMyObjet)

    const currentUser = this.authenticationService.currentUser();
    if(currentUser?.id!==undefined){
      this.propositionService.creerProposition(this.idAEchanger, this.destinataire.id, currentUser.id,this.latitude,this.longitude).subscribe({
        next: (response: any) => {
          console.log('Proposition créée avec succès:', response);
          alert('Proposition créée avec succès!');
          this.router.navigate(['/apps/objet/proposition']);
        },
        error: (err: any) => {
          console.error('Erreur lors de la création de la proposition:', err);
          alert('Erreur lors de la création de la proposition.');
        },
        complete: () => {
          console.log('Requête de création de proposition terminée.');
        }
      });
    }

  }

}
