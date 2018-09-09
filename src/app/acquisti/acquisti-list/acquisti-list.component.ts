import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-acquisti',
  templateUrl: './acquisti-list.component.html',
  styleUrls: ['./acquisti-list.component.css']
})
export class AcquistiListComponent implements OnInit {

  @ViewChild('f') searchForm : NgForm;

  from: Date;
  to: Date;
  timeFrom: NgbTimeStruct;
  timeTo: NgbTimeStruct;

  utenti: string[];
  utentiSelected: string[];

  title : string = "Archivi";

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const getUsernameUtenti = this.authService.getUsernameUtenti();

    getUsernameUtenti.subscribe(
      (val) => {
        this.utenti = val;
      },
      (response) => {
        console.log('Errore ' + response);
      }
    );
  }

}
