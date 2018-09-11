import { Component, OnInit, Input } from '@angular/core';
import { Posizione } from '../../posizioni/posizione.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AcquistiModalComponent } from '../acquisti-modal/acquisti-modal.component';
declare const google: any;

@Component({
  selector: 'app-acquisti-map',
  templateUrl: './acquisti-map.component.html',
  styleUrls: ['./acquisti-map.component.css']
})
export class AcquistiMapComponent implements OnInit {

  lat: number = 10;
  lng: number = 10;

  polygon: any;
  @Input() circle: any;
  @Input() paths: any;
  
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
  

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  polygonCreated($event) {
    console.log('polygonCreated');
    console.log(this.polygon);
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
    console.log(this.paths);
  }

  getPaths() {
    console.log("get path");
    if (this.polygon) {
      const vertices = this.polygon.getPaths().getArray()[0];
      let paths = [];
      vertices.getArray().forEach(function (xy, i) {
        // console.log(xy);
        let latLng = {
          lat: xy.lat(),
          lng: xy.lng()
        };
        paths.push(JSON.stringify(latLng));
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

}
