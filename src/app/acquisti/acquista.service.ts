import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Ricerca } from "../acquisti/ricerca.model";
import { AuthService } from "../auth/auth.service";


@Injectable()
export class AcquistaService {

    baseUrl: string = "http://localhost:8080";

    constructor(private httpClient: HttpClient,
                private authService: AuthService){}

    getArchiviWithAcquistati(archivi: number[]){
        return this.httpClient.post<any>(
            this.baseUrl + '/acquistati',
            archivi,
            {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set("Authorization", "Bearer " + this.authService.getToken())
            }
        );
    }

    acquistaArchivi(archivi: number[]){
        return this.httpClient.post<any>(
            this.baseUrl + '/acquisti',
            archivi,
            {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set("Authorization", "Bearer " + this.authService.getToken())
            }
        );
    }
}