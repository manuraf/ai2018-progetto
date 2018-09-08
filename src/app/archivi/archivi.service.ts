import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Archivio } from "./archivio.model";


@Injectable()
export class ArchiviService {

    baseUrl: string = "http://localhost:8080";

    constructor(private httpClient: HttpClient){}

    getArchivi(){
        return this.httpClient.get<Archivio[]>(
            this.baseUrl + '/archivio',
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

}