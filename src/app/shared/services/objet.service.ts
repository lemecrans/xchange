import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/core/service/auth.service';
import { environment } from 'src/app/environments/environment';
import { Objet } from 'src/app/shared/models/objet.model';

const URL_BASE = environment.host + 'objet';

@Injectable({
  providedIn: 'root'
})
export class ObjetService {
  

  private _listeMesObjets = new BehaviorSubject<any[]| null>(null);

  private _listeObjets = new BehaviorSubject<Objet[]| null>(null)
  
  constructor(private http: HttpClient,private authenticationService: AuthenticationService) { 
    this.getListMesObjet();
  }

  getAllObject(): Observable<Objet[]> {
    return this.http.get<Objet[]>(URL_BASE);
  }

  getObjectById(id: any): Observable<Objet>{
    return this.http.get<Objet>(URL_BASE+'/'+id)
  }

  getObjectByUser(id:any): Observable<Objet[]>{
    const params = new HttpParams().set('idUser', id);
    return this.http.get<Objet[]>(URL_BASE+'/myThing',{params})
  }

  createObjet(objet: any, file: File): Observable<number> {
    const formData = new FormData();
    formData.append('objet', JSON.stringify(objet));
    formData.append('image', file);

    return this.http.post<number>(URL_BASE, formData, {
      headers: new HttpHeaders({
      }),
      observe: 'body'
    });
  }

  get listeMesObjets() {
    return this._listeMesObjets.asObservable();
  }
  getListMesObjet(): Observable<any[] | null> {

    const url = URL_BASE + '/myThing';
    const currentUser = this.authenticationService.currentUser();
    if (currentUser?.id !== undefined) {
      const params = new HttpParams().set('idUser', currentUser.id.toString());
      this.http.get<any[]>(url, { params }).subscribe({
        next: (response) => {
          const objets = response.map((objet: any) => ({
            id: objet.id,
            nom: objet.nom,
            description: objet.description,
            valeur: objet.valeur,
            disponible: objet.disponible,
            proprietaire: objet.proprietaire,
            img: `data:image/png;base64,${objet.image}`
          }));
          this._listeMesObjets.next(objets);
        },
        error: (error) => {
          console.error('Une erreur est survenue : ', error);
          this._listeMesObjets.next(null);
        }
      });
    } else {
      console.error('Erreur : idUser est indéfini');
      this._listeMesObjets.next(null);
    }
  
    return this._listeMesObjets.asObservable();
  }

  updateObjet(objetToUpdate: Objet): Observable<Objet> {
    return this.http.put<Objet>(URL_BASE, objetToUpdate);
  }
  

}
