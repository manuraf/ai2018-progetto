import { Component, OnInit } from '@angular/core';

import { Posizione } from '../../posizione.model';

@Component({
  selector: 'posizione-item',
  templateUrl: './posizione-item.component.html',
  styleUrls: ['./posizione-item.component.css']
})
export class PosizioneItemComponent implements OnInit {

  archivi : Posizione[] = [];

  constructor() { }

  ngOnInit() {
  }
  }