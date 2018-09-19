import { Component, OnInit, Input } from '@angular/core';
import { GoogleDatatableService } from '../googleDatatable.service';
import { Posizione } from '../../posizioni/posizione.model';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  _posizioni: Posizione[];
  @Input() elementId: string;
  @Input() colorsUtenti: [{[key:string]:string}];

  constructor(private _datatableService: GoogleDatatableService) {}

  ngOnInit(): void {
      //this._datatableService.BuildDatatable("timeline", this.posizioni); 
  }

  @Input()
  set posizioni(posizioni: Posizione[]){
    this._posizioni = posizioni;
    this._datatableService.BuildDatatable("timeline", this._posizioni, this.colorsUtenti); 
  }

}
