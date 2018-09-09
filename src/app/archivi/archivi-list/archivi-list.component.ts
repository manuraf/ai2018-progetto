import { Component, OnInit, Input } from '@angular/core';

import { Archivio } from '../archivio.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PosizioniListComponent } from '../../posizioni/posizioni-list/posizioni-list.component';
import { PosizioniModalComponent } from '../../posizioni/posizioni-modal/posizioni-modal.component';

@Component({
  selector: 'archivi-list',
  templateUrl: './archivi-list.component.html',
  styleUrls: ['./archivi-list.component.css']
})
export class ArchiviListComponent implements OnInit {

  @Input('archivi') archivi : Archivio[];
  @Input('title') title: string;
  @Input() posizione: boolean;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  onVisualizzaPosizioni(archivio: Archivio){

    const modelRef = this.modalService.open(PosizioniModalComponent);
    modelRef.componentInstance.name = 'World';
   // modelRef.componentInstance.posizioni = archivio.posizioni;
  }

  onElimina(archivio: Archivio){

  }
}