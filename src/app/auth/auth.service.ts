import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {

    token : string;

    constructor(private router: Router){}

    signupUser(username: string, password: string) {
        //chiamata al servizio di registrazione
    }

    signinUser(username: string, password: string) {
        //chiamata al servizio di login
        //return this.http.post<any>(this.appConfig.getConfig().baseUrlAuthService + '/richiediToken',
        //{   appSecret: this.appConfig.getConfig().appSecret,
        //    appCode: localStorage.getItem('appCode')
        //}
        //);
        this.token = "XDR";
        this.router.navigate(['/']);
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
    }
}