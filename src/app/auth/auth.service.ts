import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Utente } from './utente.model';
import { AppConfigService } from "../app-config.service";

@Injectable()
export class AuthService {

    token : string;
    baseUrl: string;

    security_jwt_client_id: string = "testjwtclientid";
    security_jwt_client_secret: string = "XY7kmzoNzl100";

    constructor(private httpClient: HttpClient,
                private router: Router,
                private appConfig: AppConfigService){
        this.baseUrl = appConfig.getConfig().baseUrl;
    }

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

    getToken(): string {
       return JSON.parse(localStorage.getItem('currentUser')).access_token;
    }

    isAuthenticated(){
        return this.isValidToken();
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

    public isValidToken(): boolean {
        // token non esiste nella local storage quindi non valido
        if (!localStorage.getItem('currentUser')) {
          return false;
        }
        // token esiste ma devo verificare che non sia scaduto
        if (this.isExpiredToken()) {
          return false;
        }
    
        // token valido
        return true;
      }
    
      public isExpiredToken(): boolean {
        const tokenDecoded = this.parseJwt(JSON.parse(localStorage.getItem('currentUser')).access_token);
        const dataScadenza: Date = new Date(tokenDecoded.exp * 1000);
        const now: Date = new Date();
        if (now > dataScadenza) {
            this.logout();
          return true;
        }
        return false;
      }

      public parseJwt (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
      }

      public getUserLogged() {
        if (localStorage.getItem('currentUser')) {
          const jwt = this.parseJwt(JSON.parse(localStorage.getItem('currentUser')).access_token);
          return jwt;
        } 
        return null;
      }
}