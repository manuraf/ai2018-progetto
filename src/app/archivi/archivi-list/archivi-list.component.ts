import { Component, OnInit, Input } from '@angular/core';

import { Archivio } from '../archivio.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PosizioniListComponent } from '../../posizioni/posizioni-list/posizioni-list.component';
import { PosizioniModalComponent } from '../../posizioni/posizioni-modal/posizioni-modal.component';
import { ArchiviService } from '../archivi.service';

@Component({
  selector: 'archivi-list',
  templateUrl: './archivi-list.component.html',
  styleUrls: ['./archivi-list.component.css']
})
export class ArchiviListComponent implements OnInit {

  @Input('archivi') archivi : Archivio[];
  @Input('title') title: string;
  @Input() renderedPosizione: boolean = false;
  @Input() renderedAcquisti: boolean = false;

  constructor(private modalService: NgbModal,
              private archiviService: ArchiviService) { }

  ngOnInit() {
  }

  onVisualizzaPosizioni(archivio: Archivio){

    const modelRef = this.modalService.open(PosizioniModalComponent);
    modelRef.componentInstance.archivio = archivio;
  }

  onElimina(archivio: Archivio){
    const eliminaArchivio = this.archiviService.eliminaArchivio(archivio);

    eliminaArchivio.subscribe(
      (val) => {
        archivio.acquistabile = false;
      },
      (response) => {
        console.log('Errore ' + response);
      }
    );
  }
}