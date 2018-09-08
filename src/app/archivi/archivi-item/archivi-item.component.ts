import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Posizione } from '../../posizioni/posizione.model';
import { ArchiviService } from '../archivi.service';
import { Archivio } from '../archivio.model';

@Component({
  selector: 'app-archivi-item',
  templateUrl: './archivi-item.component.html',
  styleUrls: ['./archivi-item.component.css']
})
export class ArchiviItemComponent implements OnInit {

  time: NgbTimeStruct = {hour: 13, minute: 30, second: 30};
  posizioni: Posizione[] = [];

  constructor(private archiviService: ArchiviService, 
              private router: Router) { }

  ngOnInit() {
  }


  onSalvaClick(){

    const salvaArchivio = 
      this.archiviService.salvaArchivio(new Archivio(this.posizioni));

    salvaArchivio.subscribe(
      (val) => {
        this.router.navigate(['/archivi']);
      },
      (response) => {
        //this.router.navigate(['/archivi']);
      }
    );
  }

  onAnnullaClick(){
    this.router.navigate(['/archivi']);
  }

  onSubmit(form: NgForm){
   
    const data = new Date(
      form.value.data.year,form.value.data.month,form.value.data.day,
      form.value.time.hour,form.value.time.minute,form.value.time.second
    );
    this.posizioni.push(new Posizione(data,form.value.lat, form.value.lng));
  }

}
