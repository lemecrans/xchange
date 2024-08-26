import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { ObjetService } from 'src/app/shared/services/objet.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Objet } from 'src/app/shared/models/objet.model';

@Component({
  selector: 'app-crm-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  objet: Objet | null = null;
  updateObjetFormGroup!: FormGroup;
  previousUrl: string | null = null;
  @ViewChild('content', { static: true }) content: any;
  message: string = '';
  error: boolean = true;

  constructor (
    private sanitizer: DomSanitizer,
    public activeModal: NgbModal,
    private fb: FormBuilder,
    private objetService: ObjetService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Objet', path: '/' }, { label: 'Modifier', path: '/', active: true }];
    this.updateObjetFormGroup = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      valeur: ['', Validators.required],
      disponible: [false]
    });
    this.redirectionRoutePrecedent();
    this._fetchData();
  }

  /**
   * fetch objet to update
   */
  _fetchData(): void {
    this.route.queryParams.subscribe(params => {
      this.objetService.getObjectById(params.id).subscribe({
        next: (response: Objet) => {
          this.objet = response;
          console.log("==========================================")
          console.log(this.objet);
          this.initFormGroup(this.objet);  // Directly pass this.objet
        },
        error: (error) => {
          this.router.navigate([this.previousUrl || '']);
        }
      });
    });
  }

  modifier() {
    if (this.objet && this.updateObjetFormGroup.valid) {
      this.objet.nom = this.updateObjetFormGroup.value.nom;
      this.objet.description = this.updateObjetFormGroup.value.description;
      this.objet.valeur = this.updateObjetFormGroup.value.valeur;
      this.objet.disponible = this.updateObjetFormGroup.value.disponible;
  
      console.log("UPDATE");
      console.log(this.objet);
  
      this.objetService.updateObjet(this.objet).subscribe({
        next: (updatedObjet) => {
          console.log('Objet mis à jour:', updatedObjet);
          this.message = 'Objet mis à jour avec succès!';
          this.error =false;
          this.openModal();
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour:', err);
          this.message ='Erreur lors de la mise à jour: ' + err.message, 'error';
          this.openModal();
        }
      });
    }
  }
  

  redirectionRoutePrecedent() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.previousUrl = event.url;
      }
    });
  }

  initFormGroup(objet: Objet) {
    this.updateObjetFormGroup = this.fb.group({
      nom: [objet.nom || '', Validators.required],
      description: [objet.description || ''],
      valeur: [objet.valeur || '', Validators.required],
      disponible: objet.disponible !== undefined ? objet.disponible : false
    });
  }
  
  openModal(): void {
    this.activeModal.open(this.content, { centered: true });
  }
}
