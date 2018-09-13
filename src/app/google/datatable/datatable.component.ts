import { Component, OnInit, Input } from '@angular/core';
import { GoogleDatatableService } from '../googleDatatable.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  @Input() data: any[];
  @Input() elementId: string;


  constructor(private _datatableService: GoogleDatatableService) {}

    ngOnInit(): void {
        this._datatableService.BuildDatatable(this.elementId, this.data, null); 
    }

}
