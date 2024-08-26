import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ChartOptions } from "src/app/pages/charts/apex/apex-chart.model";
import { BreadcrumbItem } from "src/app/shared/page-title/page-title.model";
import { CompanyInfoItem } from "../shared/crm.model";
import { COMPANYLIST } from "../shared/data";
import { ObjetService } from "src/app/shared/services/objet.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-crm-opportunities",
  templateUrl: "./opportunities.component.html",
  styleUrls: ["./opportunities.component.scss"],
})
export class OpportunitiesComponent implements OnInit, OnDestroy {
  pageTitle: BreadcrumbItem[] = [];
  newOpportunity!: FormGroup;
  mesObjet: any[] = [];
  objetsSub!: Subscription;
  searchTerm: string = "";
  sortCategory: string = "All";
  staticsChart!: Partial<ChartOptions>;
  isQrView: boolean = true;
  objetSelected: any;

  @ViewChild("content", { static: true }) content: any;

  constructor(
    public activeModal: NgbModal,
    private fb: FormBuilder,
    private objetservice: ObjetService
  ) {}

  ngOnInit(): void {
    this.pageTitle = [
      { label: "Mes Objets", path: "/" },
      { label: "liste", path: "/", active: true },
    ];
    this.newOpportunity = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", Validators.required],
      category: ["", Validators.required],
    });
    this._fetchData();
    this.initChart();
  }

  // convenience getter for easy access to form fields
  get form1() {
    return this.newOpportunity.controls;
  }

  /**
   * fetches data
   */
  _fetchData(): void {
    this.objetsSub = this.objetservice.listeMesObjets.subscribe({
      next: (liste) => {
        console.log(liste);
        if (liste) {
          this.mesObjet = liste;
          this.objetSelected = liste[0];
        }
      },
    });
  }

  /**
   * initialize chart
   */
  initChart(): void {
    this.staticsChart = {
      series: [28, 20, 40, 30, 10],
      chart: {
        type: "pie",
        height: 300,
      },
      dataLabels: {
        enabled: false,
      },
      labels: ["Won", "Hot", "Cold", "In-progress", "Lost"],
      legend: {
        position: "bottom",
        fontSize: "15px",
        horizontalAlign: "center",
      },
    };
  }

  /**
   * opens modal
   * @param title title of modal
   * @param data data to be used in modal
   */
  openModal(): void {
    this.activeModal.open(this.content, { centered: true });
  }

  /**
   * Search Method
   */
  searchData(searchTerm: string): void {
    if (searchTerm === "") {
      this._fetchData();
    } else {
      let updatedData = this.mesObjet;
      updatedData = updatedData.filter((mesObjet) =>
        mesObjet.nom?.toLowerCase().includes(searchTerm)
      );
      this.mesObjet = updatedData;
    }
  }
  ngOnDestroy(): void {
    if (this.objetsSub) this.objetsSub.unsubscribe();
  }
  agrandir(objetToSelect: any) {
    this.isQrView = false;
    this.objetSelected = objetToSelect;
  }
  voir(objetToSelect: any) {
    this.isQrView = true;
    setTimeout(() => {
      this.objetSelected = objetToSelect;
    }, 500);
  }
}
