import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Archivio } from '../../archivi/archivio.model';
import { AcquistaService } from '../acquista.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-acquisti-modal',
  templateUrl: `./acquisti-modal.component.html`,
  styleUrls: ['./acquisti-modal.component.css']
})
export class AcquistiModalComponent implements OnInit {

  @Input() archivi : Archivio[];
  disableConfermaAcquista: boolean = true;
  numArchiviDaAcquistare: number;

  constructor(public activeModal: NgbActiveModal,
              private toastr: ToastrService,
              private acquistaService: AcquistaService) { }

  ngOnInit() {
    this.numArchiviDaAcquistare = this.archivi.filter(a => !a.acquistato).length
    this.disableConfermaAcquista = this.numArchiviDaAcquistare == 0;
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
        this.showSuccess("Archivi acquistati con successo!"); 
        this.activeModal.close('Close click')
      },
      (response) => {
        this.showError(response); 
      }
    );
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Success!', {
      timeOut: 3000
    });
  }

  showError(message: string) {
    this.toastr.error(message, 'Errore!', {
      timeOut: 3000
    });
  }

}
