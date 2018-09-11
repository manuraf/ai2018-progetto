import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../auth/auth.service';
import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { ArchiviService } from '../../archivi/archivi.service';
import { Posizione } from '../../posizioni/posizione.model';
declare const google: any;

@Component({
  selector: 'app-acquisti',
  templateUrl: './acquisti-list.component.html',
  styleUrls: ['./acquisti-list.component.css']
})
export class AcquistiListComponent implements OnInit {

  @ViewChild('f') searchForm : NgForm;

  from: Date;
  to: Date;
  timeFrom: NgbTimeStruct;
  timeTo: NgbTimeStruct;

  utenti: IMultiSelectOption[];
  utentiSelected: string[];
  posizioni: Posizione[] = [];
  
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
      draggable: true,
      editable: true
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
              private archiviService: ArchiviService) { }

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

    // this.agmMap.mapReady.subscribe(map => {
    //   console.log(map);
    // });
  }

  boundsChange(event) {
    console.log(event.getNorthEast().lat());
    console.log(event.getNorthEast().lng());
    console.log(event.getSouthWest().lat());
    console.log(event.getSouthWest().lng());
  }

  onChange() {
    //console.log(this.utentiSelected);
    
  }

  onChangeFrom(event) {
    console.log(event);
    
  }

  onChangeTimeFrom(event) {
    console.log(event);
    
  }

  onSubmit(form: NgForm){
    
    
    //console.log(this.agmMap.fitBounds);
   
    let from = null;
    if(form.value.from && form.value.timeFrom) {
      from = new Date(
        form.value.from.year,form.value.from.month,form.value.from.day,
        form.value.timeFrom.hour,form.value.timeFrom.minute,form.value.timeFrom.second
      );
    }

    let to = null;
    if(form.value.to && form.value.timeTo) {
      to = new Date(
        form.value.to.year,form.value.to.month,form.value.to.day,
        form.value.timeTo.hour,form.value.timeTo.minute,form.value.timeTo.second
      );
    }

    const getArchiviByMap = this.archiviService.getArchiviByMap(from,to,this.utentiSelected);

    getArchiviByMap.subscribe(
      (val) => {
        this.posizioni = val;
        this.circle = [];

        this.posizioni.map(posizione => {
          this.circle.push({
            lat: posizione.latitudine, 
            lng: posizione.longitudine, 
            radius: 2000, 
            color: this.colorsUtenti[posizione.archivio.utente]
          });
        })
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
    console.log(this.paths);
    if(this.paths){
      /* devo fare una nuova ricerca */
    } else {
      /* ho già le posizioni, quindi mi ricavo subito gli archivi da acquistare */
      //this.ricavoArchiviAndOpenDialog();
    }
  }

  // private ricavoArchiviAndOpenDialog(){
  //   /* ricavo archivi dalle posizioni selezionate e apro la dialog di conferma */
  //   let uniques = new Set();

  //   this.posizioni.map( p => {
  //     uniques.add(p.archivio.id)
  //   });

  //   const modelRef = this.modalService.open(AcquistiModalComponent);
  //   modelRef.componentInstance.archivi = archivi;
  // }

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
