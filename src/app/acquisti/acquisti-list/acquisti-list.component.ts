import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbTimeStruct, NgbModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../auth/auth.service';
import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { ArchiviService } from '../../archivi/archivi.service';
import { Posizione } from '../../posizioni/posizione.model';
import { AcquistaService } from '../acquista.service';
import { Archivio } from '../../archivi/archivio.model';
import { AcquistiModalComponent } from '../acquisti-modal/acquisti-modal.component';
import { ToastrService } from 'ngx-toastr';
declare const google: any;

@Component({
  selector: 'app-acquisti',
  templateUrl: './acquisti-list.component.html',
  styleUrls: ['./acquisti-list.component.css']
})
export class AcquistiListComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  timeFrom: NgbTimeStruct;
  timeTo: NgbTimeStruct;

  utenti: IMultiSelectOption[];
  utentiSelected: string[];
  posizioni: Posizione[] = [];
  archivi: Set<number> = new Set();
  archiviDaAcquistare: Archivio[] = [];
  polygonCreato : boolean = false;
  
  polygon: any;
  circle: any;
  paths: any;

  title : string = "Archivi";
  renderedAcquista : boolean = false;
  dataInizio : Date;
  dataFine : Date;
  radius: number = 6000;

  colors: String[] = ['red','blue','DEEPPINK','BLACK','DARKGRAY','green','yellow']
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
              private acquistiService: AcquistaService,
              private toastr: ToastrService,
              private modalService: NgbModal) { }

  ngOnInit() {
    const getUsernameUtenti = this.authService.getUsernameUtenti();

    getUsernameUtenti.subscribe(
      (val) => {
        this.utenti = [];

        val.map((utente,index) => {
          if(utente !== this.authService.getUserLogged().user_name) {
            this.utenti.push({ id: utente, name: utente });
            this.colorsUtenti[utente+''] = this.colors[index];
          }
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

    let altezza = Math.abs(event.getNorthEast().lat() - event.getSouthWest().lat());
    this.radius = (40*altezza/100) * 10000;

    this.onDataChange();
  }

  getObservableArchiviByMap(paths : any){
    let from = null;
    let to = null;
    let fromForm = this.form.value.from;
    let toForm = this.form.value.to;

    if(fromForm && this.timeFrom) {
      from = new Date(
        fromForm.year,fromForm.month-1,fromForm.day,
        this.timeFrom.hour,this.timeFrom.minute,this.timeFrom.second
      );
    }
 
    if(toForm && this.timeTo) {
      to = new Date(
        toForm.year,toForm.month-1,toForm.day,
        this.timeTo.hour,this.timeTo.minute,this.timeTo.second
      );
    }

    return this.archiviService.getArchiviByMap(from,to,this.utentiSelected,paths);
  }

  onDataChange(){
    
    const getArchiviByMap = this.getObservableArchiviByMap(this.paths);

    getArchiviByMap.subscribe(
      (val) => {
        this.posizioni = val;
        this.circle = [];

        this.posizioni.map(posizione => {
          this.circle.push({
            lat: posizione.latitudine, 
            lng: posizione.longitudine, 
            radius: this.radius, 
            color: this.colorsUtenti[posizione.archivio.utente]
          });
        })

        length = this.posizioni.length;
        if(length > 0) this.dataInizio = this.posizioni[0].timestamp
        else this.dataInizio = null;

        if(length > 0) this.dataFine = this.posizioni[length-1].timestamp
        else this.dataFine = null;

        this.renderedAcquista = this.posizioni.length > 0;
        this.aggiornaArchiviDaAcquistare();
      },
      (response) => {
        this.showError(response);
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

    this.polygonCreato = true;
    this.aggiornaArchiviDaAcquistare();
  }

  getPolygonPaths() {
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

    const getArchiviWithAcquistati = this.acquistiService.getArchiviWithAcquistati(Array.from(this.archivi));

    getArchiviWithAcquistati.subscribe(
      (val) => {
        this.archiviDaAcquistare =  val;

        const modelRef = this.modalService.open(AcquistiModalComponent, { size: 'lg', backdrop: 'static' });
        modelRef.componentInstance.archivi = this.archiviDaAcquistare;
      },
      (response) => {
        this.showError(response);
      }
    );

  }

  aggiornaArchiviDaAcquistare() {

    /* se il poligono è stato creato, recupero posizioni nel poligono*/
    if(this.polygonCreato) {
      const getArchiviByMap = this.getObservableArchiviByMap(this.getPolygonPaths());

      getArchiviByMap.subscribe(
        (val) => {
          this.ricavaArchiviDaAcquistare(val);
        },
        (response) => {
          console.log(response);
          this.showError(response);
        }
      );

    } else {
      this.ricavaArchiviDaAcquistare(this.posizioni);
    }
  }

  ricavaArchiviDaAcquistare(posizioni:Posizione[]) {

    /* ho già le posizioni, quindi mi ricavo subito gli archivi da acquistare */
    /* ricavo id archivi dalle posizioni selezionate */
    this.archivi = new Set();

    posizioni.map( p => {
      this.archivi.add(p.archivio.id)
    });

  }

  showError(message: string) {
    this.toastr.error(message, 'Errore!', {
      timeOut: 3000
    });
  }

}
