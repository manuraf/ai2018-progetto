import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  renderedKo: boolean = false;
  renderedOk: boolean = false;
  responseMessage: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignup() {

    const username = this.form.value.username;
    const password = this.form.value.password;
    const signupUser = this.authService.signupUser(username, password);

    signupUser.subscribe(
      (val) => {
          this.responseMessage = "Utente registrato con successo!";
          this.renderedOk = true; 
      },
      response => {
        this.responseMessage = "Errore " + response.error;
        this.renderedKo = true; 
      });
  }

}
