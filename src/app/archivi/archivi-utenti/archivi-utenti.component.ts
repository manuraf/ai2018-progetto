import { Component, OnInit } from '@angular/core';
import { Archivio } from '../archivio.model';
import { ArchiviService } from '../archivi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-archivi-utenti',
  templateUrl: './archivi-utenti.component.html',
  styleUrls: ['./archivi-utenti.component.css']
})
export class ArchiviUtentiComponent implements OnInit {

  titleArchiviUtenti : string = "Archivi Utenti";
  titleArchiviAcquistati : string = "Archivi Acquistati";

  archivi : Archivio[];
  archivio : Archivio;

  constructor(private archiviService: ArchiviService,
              private router: Router) { }

  ngOnInit() {
    const getArchivi = this.archiviService.getArchivi();
    getArchivi.subscribe(
      (val) => {
        console.log(val);
        this.archivi = val;
      },
      (response) => {
        console.log('Errore ' + response);
        debugger;
      }
    )
  }

  onNuovoClick(){
    this.router.navigate(['/archivio']);
  }

}
