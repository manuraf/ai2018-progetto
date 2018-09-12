import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../auth/auth.service';
import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { ArchiviService } from '../../archivi/archivi.service';
import { Posizione } from '../../posizioni/posizione.model';
import { AcquistaService } from '../acquista.service';
import { Archivio } from '../../archivi/archivio.model';
declare const google: any;

@Component({
  selector: 'app-acquisti',
  templateUrl: './acquisti-list.component.html',
  styleUrls: ['./acquisti-list.component.css']
})
export class AcquistiListComponent implements OnInit {

  from: Date;
  to: Date;
  timeFrom: NgbTimeStruct;
  timeTo: NgbTimeStruct;

  utenti: IMultiSelectOption[];
  utentiSelected: string[];
  posizioni: Posizione[] = [];
  archiviDaAcquistare: Archivio[];
  
  polygon: any;
  circle: any;
  paths: any;

  title : string = "Archivi";

  colors: String[] = ['red','yellow','blue','green','grey']
  colorsUtenti: [{[key:string]:string}] = [{}];

  managerOptions = {
    drawingControl: true,
    drawingControlOptions: {
      drawingModes: ['polygon']
    },
    polygonOptions: {
      draggable: false,
      editable: false
    },
    drawingMode: "polygon"
  };

  mySettings: IMultiSelectSettings = {
    containerClasses: 'form-control'
  };

  myTexts: IMultiSelectTexts = {
    checkAll: 'Seleziona tutti',
    uncheckAll: 'Deseleziona tutti',
    checked: 'elemento selezionato',
    checkedPlural: 'elementi selezionati',
    searchPlaceholder: 'Cerca',
    defaultTitle: 'Qualsiasi Utente',
    allSelected: 'Tutti selezionati',
};

  constructor(private authService: AuthService,
              private archiviService: ArchiviService,
              private acquistiService: AcquistaService) { }

  ngOnInit() {
    const getUsernameUtenti = this.authService.getUsernameUtenti();

    getUsernameUtenti.subscribe(
      (val) => {
        this.utenti = [];

        val.map((utente,index) => {
          this.utenti.push({ id: utente, name: utente });
          this.colorsUtenti[utente+''] = this.colors[index];
        });
      },
      (response) => {
        console.log('Errore ' + response);
      }
    );

  }

  boundsChange(event) {

    this.paths = [
      {lat:event.getNorthEast().lat(),lng:event.getSouthWest().lng()},
      {lat:event.getNorthEast().lat(),lng:event.getNorthEast().lng()},
      {lat:event.getSouthWest().lat(),lng:event.getNorthEast().lng()},
      {lat:event.getSouthWest().lat(),lng:event.getSouthWest().lng()}
    ];

    this.onDataChange();
  }

  onDataChange(){
   
    let from = null;
    if(this.from && this.timeFrom) {
      from = new Date(
        this.from.getFullYear(),this.from.getMonth(),this.from.getDay(),
        this.timeFrom.hour,this.timeFrom.minute,this.timeFrom.second
      );
    }

    let to = null;
    if(this.to && this.timeTo) {
      to = new Date(
        this.to.getFullYear(),this.to.getMonth(),this.to.getDay(),
        this.timeTo.hour,this.timeTo.minute,this.timeTo.second
      );
    }
    
    const getArchiviByMap = this.archiviService.getArchiviByMap(from,to,this.utentiSelected,this.paths);

    getArchiviByMap.subscribe(
      (val) => {
        this.posizioni = val;
        this.circle = [];

        this.posizioni.map(posizione => {
          this.circle.push({
            lat: posizione.latitudine, 
            lng: posizione.longitudine, 
            radius: 6000, 
            color: this.colorsUtenti[posizione.archivio.utente]
          });
        })

        console.log(this.posizioni);
      },
      (response) => {
        console.log('Errore ' + response);
      }
    );
  }

  polygonCreated($event) {
    if (this.polygon) {
      this.polygon.setMap(null);
    }
    this.polygon = $event;
    this.addPolygonChangeEvent(this.polygon);
    google.maps.event.addListener(this.polygon, 'coordinates_changed', function (index, obj) {
      // Polygon object: yourPolygon
      console.log('coordinates_changed');
      console.log(this.polygon);
    });
    this.paths = this.getPaths();

    this.onDataChange();
  }

  getPaths() {
    if (this.polygon) {
      const vertices = this.polygon.getPaths().getArray()[0];
      let paths = [];
      vertices.getArray().forEach(function (xy, i) {
        // console.log(xy);
        let latLng = {
          lat: xy.lat(),
          lng: xy.lng()
        };
        paths.push(latLng);//JSON.stringify(latLng));
      });
      return paths;
    }
    return [];
  }

  addPolygonChangeEvent(polygon) {
    var me = polygon,
      isBeingDragged = false,
      triggerCoordinatesChanged = function () {
        // Broadcast normalized event
        google.maps.event.trigger(me, 'coordinates_changed');
      };

    // If  the overlay is being dragged, set_at gets called repeatedly,
    // so either we can debounce that or igore while dragging,
    // ignoring is more efficient
    google.maps.event.addListener(me, 'dragstart', function () {
      isBeingDragged = true;
    });

    // If the overlay is dragged
    google.maps.event.addListener(me, 'dragend', function () {
      triggerCoordinatesChanged();
      isBeingDragged = false;
    });

    // Or vertices are added to any of the possible paths, or deleted
    var paths = me.getPaths();
    paths.forEach(function (path, i) {
      google.maps.event.addListener(path, "insert_at", function () {
        triggerCoordinatesChanged();
      });
      google.maps.event.addListener(path, "set_at", function () {
        if (!isBeingDragged) {
          triggerCoordinatesChanged();
        }
      });
      google.maps.event.addListener(path, "remove_at", function () {
        triggerCoordinatesChanged();
      });
    });
  };

  onAcquista(){
    
    /* ho già le posizioni, quindi mi ricavo subito gli archivi da acquistare */
    /* ricavo archivi dalle posizioni selezionate e apro la dialog di conferma */
    let uniques = new Set();


    this.posizioni.map( p => {
      uniques.add(p.archivio.id)
    });

    console.log(Array.from(uniques));
    const getArchiviWithAcquistati = this.acquistiService.getArchiviWithAcquistati(Array.from(uniques));

    getArchiviWithAcquistati.subscribe(
      (val) => {
        this.archiviDaAcquistare =  val;
        console.log(val);
      },
      (response) => {
        console.log('Errore ' + response);
      }
    );

    // const modelRef = this.modalService.open(AcquistiModalComponent);
    // modelRef.componentInstance.archivi = archivi;
  }

  // onConfermaAcquista(){
  //   /* acquisto archivi confermati tramite la dialog */
  //   const acquistaArchivi = this.acquistaService.acquistaArchivi(uniques);

  //   acquistaArchivi.subscribe(
  //     (val) => {
  //       console.log(val);
  //     },
  //     (response) => {
  //       console.log('Errore ' + response);
  //     }
  //   );
  // }

}
