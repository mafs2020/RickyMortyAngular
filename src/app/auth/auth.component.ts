import { Component, OnInit } from '@angular/core';
import { InicioService } from '../services/inicio.service';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(public inicioServices: InicioService ) { }

  ngOnInit(): void {
    console.log(this.inicioServices.dinero);
    this.inicioServices.dinero ??= 500;
    console.log(this.inicioServices.dinero);
  }

}
