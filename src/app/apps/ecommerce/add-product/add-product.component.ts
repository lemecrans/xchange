import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Select2Data } from 'ng-select2-component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { Objet } from '../../../shared/models/objet.model';
import { Utilisateur } from '../../../shared/models/utilisateur.model';
import { ObjetService } from '../../../shared/services/objet.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-ecommerce-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  newObjet!: FormGroup;
  files: File[] = [];
  category: Select2Data = [];
  objet: Partial<Objet> = {};
  proprietaire : Partial<Utilisateur> = {}
  currentUser: any

  constructor (
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private ObjetService : ObjetService,
    private router : Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Objets', path: '/' }, { label: 'Ajouter un objet', path: '/', active: true }];
    this.newObjet = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      valeur: ['', Validators.required],
      disponible: ['', Validators.required]
    });

    const currentUser = this.authenticationService.currentUser();
    if(currentUser)
        this.currentUser = currentUser
  }

  // convenience getter for easy access to form fields
  get form1() { return this.newObjet.controls; }

 // Gérer les fichiers sélectionnés
 onSelect(event: NgxDropzoneChangeEvent): void {
  // Si un fichier est déjà sélectionné, nous n'en ajoutons pas d'autres
  if (this.files.length === 0) {
    this.files = event.addedFiles;
  } else {
    alert('Une seule image est autorisée !')
  }
}

  /**
   *   removes file from uploaded files
   */
  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.files = []
  }

  /**
  * Formats the size
  */
  getSize(f: File) {
    const bytes = f.size;
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }


  /**
   * Returns the preview url
   */
  getPreviewUrl(f: File) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(encodeURI(URL.createObjectURL(f)));
  }

  ajouterProduit(){
    this.objet.nom = this.newObjet.value.nom
    this.objet.description = this.newObjet.value.description
    this.objet.valeur = this.newObjet.value.valeur
    this.objet.disponible = this.newObjet.value.disponible

    this.objet.proprietaire = new Utilisateur(this.currentUser?.id,this.currentUser?.email,this.currentUser?.password,this.currentUser?.username,this.currentUser?.role,this.currentUser?.nombreDeNotes,this.currentUser?.noteMoyenne)

    if (this.files.length>0 && this.newObjet.status!=='INVALID') {
      this.ObjetService.createObjet(this.objet, this.files[0]).subscribe({
        next: (id: number) => {
          alert('Objet créé avec succès');
          this.router.navigate(['/apps/ecommerce/product/details'], { queryParams: { id } });
        },
        error: (err) => {
          alert('Erreur lors de la création de l\'objet: '+ err);
        }
      });
    } else {
      alert('Veuillez remplir tous les champs !')
    }
  }

}
