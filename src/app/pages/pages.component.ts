/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { InicioService } from '../services/inicio.service';

@Component({
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(public inicioServices: InicioService) { }

  ngOnInit(): void {
    console.log(this.inicioServices.dinero);
    this.inicioServices.dinero ??= 800;
    console.log(this.inicioServices.dinero ??= 800);
    console.log(this.inicioServices.dinero);
  }

}
