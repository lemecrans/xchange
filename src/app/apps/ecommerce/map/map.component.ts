import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import * as L from 'leaflet';
import { PropositionEchangeService } from 'src/app/shared/services/proposition-echange.service';
import { PropositionEchange } from 'src/app/shared/models/propositionEchange.model';
import { Utilisateur } from 'src/app/shared/models/utilisateur.model';
import { AuthenticationService } from 'src/app/core/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

const iconRetinaUrl = 'assets/leaflet/marker-icon-2x.png';
const iconUrl = 'assets/leaflet/marker-icon.png';
const shadowUrl = 'assets/leaflet/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  private map!: L.Map;
  propositions : PropositionEchange[] = []
  myPropositions : PropositionEchange[] = []

  pageTitle: BreadcrumbItem[] = [];

  currentUser! : Utilisateur | any;

  objetId! : string

  constructor(private propositionEchangeService: PropositionEchangeService,private authenticationService:AuthenticationService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Objet', path: '/' }, { label: 'Carte', path: '/', active: true }];

    this.route.queryParams.subscribe(params => {
      if(params['id']!==null){
        this.objetId = params['id']
      }
    });
  }

  getAllEchange(){
    if(this.authenticationService.currentUser()!==null){
      this.currentUser = this.authenticationService.currentUser()
    }

    this.propositionEchangeService.getAllProposition().subscribe({
      next: (propositions) => {
        this.propositions = propositions;
        this.filterPropositions()
        this.initMap()
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des propositions:', err);
      },
      complete: () => {
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

  private initMap(): void {
    const map = L.map('map').setView([-18.8792, 47.5079], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    this.addMarkersToMap(map)
  }

  addMarkersToMap(map: L.Map) {
    this.myPropositions.forEach((proposition) => {
      const marker = L.marker([proposition.latitude, proposition.longitude])
        .addTo(map)
        .bindPopup(`
          Proposant: ${proposition.proposant.username}<br>
          Destinataire: ${proposition.destinataire.username}<br>
          Date: ${proposition.dateProposition}<br>
          État: ${proposition.etat}<br>
          <a class="navigate-button">Voir</a>
        `)
        if (this.objetId === proposition.id.toString()) {
          marker.openPopup();
          map.setView(marker.getLatLng(), 15); // Optionnel: centrer la carte sur le marqueur
        }
    });
    map.on('popupopen', (event: L.PopupEvent) => {
      const popup = event.popup;
      const popupElement = popup.getElement();

      if (popupElement) {
        const links = popupElement.getElementsByClassName('navigate-button');
        Array.from(links).forEach(link => {
          link.addEventListener('click', (e: Event) => {
            e.preventDefault();
            const target = e.target as HTMLAnchorElement;
            this.navigateToOrders();
          });
        });
      }
    });
    
  }
  navigateToOrders() {
    this.router.navigate(['/apps/ecommerce/orders']);
  }
  
  ngAfterViewInit(): void {
    this.getAllEchange()
  }

}
