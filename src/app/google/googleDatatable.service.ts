import { Injectable } from '@angular/core';
import { GoogleChartsBaseService } from './google.service';
import { Posizione } from '../posizioni/posizione.model';

declare var google: any;

@Injectable()
export class GoogleDatatableService {

  constructor() { 
    google.charts.load('current', {'packages':['timeline']});
  }

  public BuildDatatable(elementId: string, posizioni: Posizione[], colorsUtente:[{[key:string]:string}]) : void { 

    google.charts.setOnLoadCallback(() => {
      var chart = new google.visualization.Timeline(document.getElementById(elementId));
      var dataTable = new google.visualization.DataTable();

      dataTable.addColumn({ type: 'string', id: 'Role' });
      dataTable.addColumn({ type: 'string', id: 'Name' });
      dataTable.addColumn({ type: 'date', id: 'Start' });
      dataTable.addColumn({ type: 'date', id: 'End' });

      let colors = [];

      let rows = [];
      posizioni.map(p => { 
        let data = new Date(p.timestamp);
        rows.push(
          ['Posizioni', p.archivio.utente, data, new Date(data.getTime() + 60000)]
        );

        if(!colors.includes(colorsUtente[p.archivio.utente])){
          colors.push(colorsUtente[p.archivio.utente]);
        }
      });

      if(rows.length == 0) {
        rows = [[ 'Posizioni', '-', new Date(2018, 1, 1, 0, 0), new Date(2018, 1, 1, 0, 1) ]];
      }

      if(colors.length == 0) {
        colors =  ['#cbb69d'];
      }

      dataTable.addRows(rows);

      chart.draw(dataTable,{colors:colors});
    });
  }
}