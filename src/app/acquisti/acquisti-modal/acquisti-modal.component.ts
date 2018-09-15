import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Archivio } from '../../archivi/archivio.model';
import { AcquistaService } from '../acquista.service';

@Component({
  selector: 'app-acquisti-modal',
  templateUrl: `./acquisti-modal.component.html`,
  styleUrls: ['./acquisti-modal.component.css']
})
export class AcquistiModalComponent implements OnInit {

  @Input() archivi : Archivio[];
  disableConfermaAcquista: boolean = true;

  constructor(public activeModal: NgbActiveModal,
              private acquistaService: AcquistaService) { }

  ngOnInit() {
    this.disableConfermaAcquista = 
      this.archivi.filter(a => !a.acquistato).length == 0;
  }

  onConfermaAcquista(){
    let ids = [];
    this.archivi.map(archivio => {
      if(!archivio.acquistato) ids.push(archivio.id)
    });
    
    /* acquisto archivi confermati tramite la dialog */
    const acquistaArchivi = this.acquistaService.acquistaArchivi(ids);

    acquistaArchivi.subscribe(
      (val) => {
        this.archivi = [];
        this.activeModal.close('Close click')
      },
      (response) => {
        console.log('Errore ' + response);
      }
    );
  }

}
