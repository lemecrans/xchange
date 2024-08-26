import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { PropositionEchange } from '../models/propositionEchange.model';

const URL_BASE = environment.host + 'propositions';
@Injectable({
  providedIn: 'root'
})
export class PropositionEchangeService {

  constructor(private http: HttpClient) { }

  getAllProposition(): Observable<PropositionEchange[]>{
    return this.http.get<PropositionEchange[]>(URL_BASE)
  }

  validerProposition(id: string): Observable<string> {
    return this.http.put<string>(`${URL_BASE}/${id}/valider`, null, {
      responseType: 'text' as 'json'
    });
  }

  creerProposition(idAEchanger: number[], destinataireId: number, proposantId: number,latitude:any,longitude:any) {
    const objetIds = idAEchanger.join(',');

    const params = new HttpParams()
      .set('objetIds', objetIds)
      .set('destinataireId', destinataireId.toString())
      .set('proposantId', proposantId.toString());

      const body = {
        proposant_id: proposantId,
        dateProposition: new Date().toISOString().split('T')[0],
        latitude: latitude, 
        longitude: longitude, 
        etat: "En attente",
        objetIds: idAEchanger,
        destinataireId: destinataireId
      };

    return this.http.post(URL_BASE, body,{ params });
  }
}
