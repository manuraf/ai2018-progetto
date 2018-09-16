import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  ngOnInit() {
  }

  constructor(private toastr: ToastrService,
              private authService: AuthService) {
 }

  onSignup() {
    
    const username = this.form.value.username;
    const password = this.form.value.password;
    const signupUser = this.authService.signupUser(username, password);

    signupUser.subscribe(
      (val) => {
          this.showSuccess("Utente registrato con successo!"); 
      },
      response => {
        this.showError("Errore " + response.error);
      });
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Success!', {
      timeOut: 3000
    });
  }

  showError(message: string) {
    this.toastr.error(message, 'Oops!', {
      timeOut: 3000
    });
  }

}
