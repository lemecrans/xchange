import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Product } from '../shared/ecommerce.model';
import { Objet } from 'src/app/shared/models/objet.model';
import { ObjetService } from '../../../shared/services/objet.service';
import { Location } from '@angular/common';
import { ChatService } from '../../chat/chat.service';
import { Discussion } from '../../chat/chat.model';

@Component({
  selector: 'app-ecommerce-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  product: Product = {};
  objet: Partial<Objet> = {};
  objetId:number | undefined;

  isLoading : boolean = true

  constructor (private route: ActivatedRoute,private objetService : ObjetService, private router: Router, private chatService: ChatService) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Objets', path: '/' }, { label: 'Détails', path: '/', active: true }];
    this.route.queryParams.subscribe(params => {
      this.objetService.getObjectById(params.id).subscribe({
        next: (response: Objet) => {
          this.objet = response;
          this.objetId = this.objet.id;
          this.objet.image = `data:image/png;base64,${response.image}`;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération de l\'objet:', error);
          this.router.navigate(['/apps/objet/liste-objets']);
        },
        complete: () => {
          this.isLoading = false
        }
      });
    });
    
  }
  discuter(id: number | undefined){
    if (id !== undefined) {
      var discu:Discussion;
      this.chatService.start(id).subscribe( {
        error: (err: any) => {
          console.error('Erreur lors de la récupération de l\'objet:', err);
        },
        complete: () => {
          this.chatService.get(""+id).subscribe({
            next: (response: any) => {
              discu= response;
            },
            error: (err: any) => {
              console.error('Erreur lors de la récupération de l\'objet:', err);
            },
            complete: () => {
              console.log('oke')
            }
          });
          this.router.navigate(['chat'],{ state: { selectedDiscu: discu } });
        }
      });
    }
  }

}
