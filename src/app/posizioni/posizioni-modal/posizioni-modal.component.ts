import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Archivio } from '../../archivi/archivio.model';

@Component({
  selector: 'app-posizioni-modal',
  templateUrl: `./posizioni-modal.component.html`,
  styleUrls: ['./posizioni-modal.component.css']
})
export class PosizioniModalComponent implements OnInit {

  @Input() archivio : Archivio;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
