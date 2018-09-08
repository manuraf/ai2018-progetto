import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-acquisti',
  templateUrl: './acquisti-list.component.html',
  styleUrls: ['./acquisti-list.component.css']
})
export class AcquistiListComponent implements OnInit {

  @ViewChild('f') searchForm : NgForm;

  dataIni: Date;
  dataFin: Date;

  title : string = "Archivi";

  constructor() { }

  ngOnInit() {
  }

}
