import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Archivio } from "./archivio.model";
import { Ricerca } from "../acquisti/ricerca.model";
import { Posizione } from "../posizioni/posizione.model";


@Injectable()
export class ArchiviService {

    baseUrl: string = "http://localhost:8080";

    constructor(private httpClient: HttpClient){}

    getArchiviUtente(){
        return this.httpClient.get<Archivio[]>(
            this.baseUrl + '/archivio',
            {
              headers: new HttpHeaders()
                .set("Authorization", "Bearer " + localStorage.getItem('currentUser'))
            }
        );
    }

    getArchiviAcquistati(){
        return this.httpClient.get<Archivio[]>(
            this.baseUrl + '/archivio/acquistati',
            {
              headers: new HttpHeaders()
                .set("Authorization", "Bearer " + localStorage.getItem('currentUser'))
            }
        );
    }

    salvaArchivio(archivio: Archivio){
        return this.httpClient.post<Archivio>(
            this.baseUrl + '/archivio',
            archivio,
            {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set("Authorization", "Bearer " + localStorage.getItem('currentUser'))
            }
        );
    }

    eliminaArchivio(archivio: Archivio){
        return this.httpClient.delete<any>(
            this.baseUrl + '/archivio/' + archivio.id,
            {
              headers: new HttpHeaders()
                .set("Authorization", "Bearer " + localStorage.getItem('currentUser'))
            }
        );
    }

    getArchiviByMap(from: Date, to: Date, utenti: string[], points){

        const ricerca = new Ricerca(from,to,utenti,points);
        return this.httpClient.post<Posizione[]>(
            this.baseUrl + '/archivio/byMap',
            ricerca,
            {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set("Authorization", "Bearer " + localStorage.getItem('currentUser'))
            }
        );
    }

}