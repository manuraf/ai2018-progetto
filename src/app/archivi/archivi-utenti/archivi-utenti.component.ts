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

  titleArchiviUtenti : string = "Archivi Utente";
  titleArchiviAcquistati : string = "Archivi Acquistati";

  archiviUtente : Archivio[];
  archiviAcquistati: Archivio[];
  archivio : Archivio;

  constructor(private archiviService: ArchiviService,
              private router: Router) { }

  ngOnInit() {
    const getArchivi = this.archiviService.getArchiviUtente();
    getArchivi.subscribe(
      (val) => {
        console.log(val);
        this.archiviUtente = val;
      },
      (response) => {
        console.log('Errore ' + response);
      }
    );

    const getArchiviAcquistati = this.archiviService.getArchiviAcquistati();
    getArchiviAcquistati.subscribe(
      (val) => {
        this.archiviAcquistati = val;
      },
      (response) => {
        console.log('Errore ' + response);
      }
    );
  }

  onNuovoClick(){
    this.router.navigate(['/archivio']);
  }

}
