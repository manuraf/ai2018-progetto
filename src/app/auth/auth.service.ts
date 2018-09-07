import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Utente } from './utente.model';

@Injectable()
export class AuthService {

    token : string;
    baseUrl: string = "http://localhost:8080/progetto/";

    constructor(private httpClient: HttpClient,
                private router: Router){}

    signupUser(username: string, password: string) {
        //chiamata al servizio di registrazione
        return this.httpClient.post<any>(this.baseUrl + '/', new Utente(username,password));      
    }

    signinUser(username: string, password: string) {
        //chiamata al servizio di login
        //return this.http.post<any>(this.appConfig.getConfig().baseUrlAuthService + '/richiediToken',
        //{   appSecret: this.appConfig.getConfig().appSecret,
        //    appCode: localStorage.getItem('appCode')
        //}
        //);
        this.token = "XDR";
        this.router.navigate(['/archivi']);
    }

    getToken(){
        //return token
    }

    isAuthenticated(){
        return this.token != null;
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.clear();
        this.token = null;
        this.router.navigate(['/']);
    }
}