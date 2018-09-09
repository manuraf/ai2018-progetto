import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Utente } from './utente.model';

@Injectable()
export class AuthService {

    token : string;
    baseUrl: string = "http://localhost:8080";

    security_jwt_client_id: string = "testjwtclientid";
    security_jwt_client_secret: string = "XY7kmzoNzl100";

    constructor(private httpClient: HttpClient,
                private router: Router){}

    signupUser(username: string, password: string) {
        //chiamata al servizio di registrazione
        return this.httpClient.post<any>(this.baseUrl + '/utente', new Utente(username,password));      
    }

    signinUser(username: string, password: string) {
        //chiamata al servizio di login
        const body = new HttpParams()
            .set('grant_type', 'password')
            .set('username', username)
            .set('password', password);

        return this.httpClient.post<any>(
            'http://localhost:8080/oauth/token',
            body.toString(),
            {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set("Authorization", "Basic " + btoa(this.security_jwt_client_id+ ':' + this.security_jwt_client_secret))
            }
        );
    }

    getToken(){
        //return token
    }

    isAuthenticated(){
        if (!localStorage.getItem('currentUser')) return false; 
        return true;
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.clear();
        this.token = null;
        this.router.navigate(['/']);
    }

    getUsernameUtenti(){
        return this.httpClient.get<string[]>(
            this.baseUrl + '/utente',
            {
              headers: new HttpHeaders()
                .set("Authorization", "Bearer " + localStorage.getItem('currentUser'))
            }
        );
    }
}