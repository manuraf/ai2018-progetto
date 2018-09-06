import { Component, OnInit } from '@angular/core';

import { Posizione } from '../posizione.model';

@Component({
  selector: 'posizioni-list',
  templateUrl: './posizioni-list.component.html',
  styleUrls: ['./posizioni-list.component.css']
})
export class PosizioniListComponent implements OnInit {

  archivi : Posizione[] = [];

  constructor() { }

  ngOnInit() {
  }
  }