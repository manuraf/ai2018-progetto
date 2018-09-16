import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormControl } from '@angular/forms';
import { Posizione } from '../../posizioni/posizione.model';
import { ArchiviService } from '../archivi.service';
import { Archivio } from '../archivio.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-archivi-item',
  templateUrl: './archivi-item.component.html',
  styleUrls: ['./archivi-item.component.css']
})
export class ArchiviItemComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  time: NgbTimeStruct = {hour: 13, minute: 30, second: 30};
  posizioni: Posizione[] = [];

  constructor(private archiviService: ArchiviService, 
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit() {
  }

  onSalvaClick(){

    const salvaArchivio = 
      this.archiviService.salvaArchivio(new Archivio(this.posizioni));

    salvaArchivio.subscribe(
      (val) => {
        this.showSuccess("Archivio salvato con successo!"); 
        this.router.navigate(['/archivi']);
      },
      (response) => {
        this.showError("Errore " + response.error);
      }
    );
  }

  onAnnullaClick(){
    this.router.navigate(['/archivi']);
  }

  onSubmit(){
    console.log(this.form);
    if(!this.time){
      this.showError("L'orario deve essere valorizzato!");
      return;
    }

    if(this.form.value.lat < -90 || this.form.value.lat > 90){
      this.showError("Latitudine deve essere un valore compreso tra -90 e 90!");
      return;
    }

    if(this.form.value.lng < -90 || this.form.value.lng > 90){
      this.showError("Longitudine deve essere un valore compreso tra -90 e 90!");
      return;
    }
   
    const data = new Date(
      this.form.value.data.year,this.form.value.data.month,this.form.value.data.day,
      this.form.value.time.hour,this.form.value.time.minute,this.form.value.time.second
    );
    this.posizioni.push(new Posizione(data,this.form.value.lat, this.form.value.lng));
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
