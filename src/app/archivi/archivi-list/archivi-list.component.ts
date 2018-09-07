import { Component, OnInit, Input } from '@angular/core';

import { Archivio } from '../archivio.model';

@Component({
  selector: 'archivi-list',
  templateUrl: './archivi-list.component.html',
  styleUrls: ['./archivi-list.component.css']
})
export class ArchiviListComponent implements OnInit {

  archivi : Archivio[] = [];
  @Input('title') title: string;

  constructor() { }

  ngOnInit() {
  }
  }