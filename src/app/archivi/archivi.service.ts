import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Archivio } from "./archivio.model";
import { Ricerca } from "../acquisti/ricerca.model";
import { Posizione } from "../posizioni/posizione.model";
import { AuthService } from "../auth/auth.service";
import { AppConfigService } from "../app-config.service";


@Injectable()
export class ArchiviService {

    baseUrl: string;

    constructor(private httpClient: HttpClient,
                private authService: AuthService,
                private appConfig: AppConfigService){
        this.baseUrl = appConfig.getConfig().baseUrl;
    }

    getArchiviUtente(){
        return this.httpClient.get<Archivio[]>(
            this.baseUrl + '/archivio',
            {
              headers: new HttpHeaders()
                .set("Authorization", "Bearer " + this.authService.getToken())
            }
        );
    }

    getArchiviAcquistati(){
        return this.httpClient.get<Archivio[]>(
            this.baseUrl + '/archivio/acquistati',
            {
              headers: new HttpHeaders()
                .set("Authorization", "Bearer " + this.authService.getToken())
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
                .set("Authorization", "Bearer " + this.authService.getToken())
            }
        );
    }

    eliminaArchivio(archivio: Archivio){
        return this.httpClient.delete<any>(
            this.baseUrl + '/archivio/' + archivio.id,
            {
              headers: new HttpHeaders()
                .set("Authorization", "Bearer " + this.authService.getToken())
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
                .set("Authorization", "Bearer " + this.authService.getToken())
            }
        );
    }

}