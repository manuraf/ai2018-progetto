import { Component, OnInit } from '@angular/core';
import { ArchiviService } from '../../archivi/archivi.service';
import { Archivio } from '../../archivi/archivio.model';
declare const google: any;

@Component({
  selector: 'app-acquisti-map',
  templateUrl: './acquisti-map.component.html',
  styleUrls: ['./acquisti-map.component.css']
})
export class AcquistiMapComponent implements OnInit {

  lat: number = 51.678418;
  lng: number = 7.809007;

  polygon: any;

  archivi: Archivio[];

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

  constructor(private archiviService: ArchiviService) { }

  ngOnInit() {
    const getArchiviByMap = this.archiviService.getArchiviByMap(null,null);

    getArchiviByMap.subscribe(
      (val) => {
        this.archivi = val;
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
    });

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
