import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  renderedKo: boolean = false;
  responseMessage: string;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onSignin(form: NgForm){
    const username = form.value.username;
    const password = form.value.password;
    const signinUser = this.authService.signinUser(username,password);

    signinUser.subscribe(
      (val) => {
          localStorage.setItem('currentUser', JSON.stringify(val.access_token));
          this.router.navigate(['/archivi']);
      },
      response => {
        const errore = JSON.stringify(response.error.error_description);
        this.authService.logout();
        this.renderedKo = true;
        this.responseMessage = errore;
      });
  }

}
