import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Ricerca } from "../acquisti/ricerca.model";


@Injectable()
export class AcquistaService {

    baseUrl: string = "http://localhost:8080";

    constructor(private httpClient: HttpClient){}

    acquistaArchivi(archivi: number[]){
        return this.httpClient.post<any>(
            this.baseUrl + '/acquisti',
            archivi,
            {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set("Authorization", "Bearer " + localStorage.getItem('currentUser'))
            }
        );
    }
}