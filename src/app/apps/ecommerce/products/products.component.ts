import { Component, OnInit, ViewChild } from "@angular/core";
import { BreadcrumbItem } from "src/app/shared/page-title/page-title.model";
import { PRODUCTLIST } from "../shared/data";
import { Product } from "../shared/ecommerce.model";
import { ObjetService } from "src/app/shared/services/objet.service";
import { Objet } from "src/app/shared/models/objet.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-ecommerce-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  products: Product[] = [];
  searchTerm: string = "";
  page = 1;
  pageSize = 8;

  objets: Objet[] = [];
  objetSelected: any;
  @ViewChild("content", { static: true }) content: any;

  isLoading : boolean = true

  constructor(
    private objetService: ObjetService,
    public activeModal: NgbModal
  ) {}

  ngOnInit(): void {
    this.pageTitle = [
      { label: "Objets", path: "/" },
      { label: "Liste", path: "/", active: true },
    ];
    this._fetchData();

    this.getAllObjets();
  }

  getAllObjets() {
    this.objetService.getAllObject().subscribe(
      {
        next: (data: Objet[]) => {
          this.objets = data;
          this.objets = data.map((item: Objet) => ({
            ...item,
            image: `data:image/png;base64,${item.image}`,
          }));
        },
        error: (error) => {
          console.error("Erreur lors de la récupération des données", error);
        },
        complete: () => {
          this.isLoading = false; 
        }
      }
    );
  }

  /**
   * fetches product list
   */
  _fetchData(): void {
    this.products = PRODUCTLIST;
  }

  /**
   * Search Method
   */
  searchData(searchTerm: string): void {
    if (searchTerm === "") {
      this.getAllObjets();
    } else {
      let updatedData = this.objets;
      updatedData = updatedData.filter((objet) =>
        objet.nom?.toLowerCase().includes(searchTerm)
      );
      this.objets = updatedData;
    }
  }
  openQRModal(objectToSelect:any): void {
    this.objetSelected = objectToSelect
    this.activeModal.open(this.content, { centered: true });
  }
}
