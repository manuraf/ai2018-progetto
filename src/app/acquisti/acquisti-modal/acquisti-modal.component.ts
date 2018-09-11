import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Archivio } from '../../archivi/archivio.model';

@Component({
  selector: 'app-acquisti-modal',
  templateUrl: `./acquisti-modal.component.html`,
  styleUrls: ['./acquisti-modal.component.css']
})
export class AcquistiModalComponent implements OnInit {

  @Input() archivi : Archivio[];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
