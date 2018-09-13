import { Injectable } from '@angular/core';
import { GoogleChartsBaseService } from './google.service';
import { Posizione } from '../posizioni/posizione.model';

declare var google: any;

@Injectable()
export class GoogleDatatableService extends GoogleChartsBaseService {

  constructor() { super(); }

  public BuildDatatable(elementId: string, data: any[], posizioni: Posizione[]) : void {  
    var chartFunc = () => { 
        var chart = new google.visualization.Timeline(document.getElementById(elementId));
    };
    
    var dataTable = new google.visualization.DataTable();

    dataTable.addColumn({ type: 'string', id: 'President' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    dataTable.addRows([
      [ 'Washington', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
      [ 'Adams',      new Date(1797, 2, 4),  new Date(1801, 2, 4) ],
      [ 'Jefferson',  new Date(1801, 2, 4),  new Date(1809, 2, 4) ]]);

    this.buildChart(data, chartFunc, dataTable);
  }
}