import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { IInfo, IPersonaje, IRequest } from 'src/app/interfaces';

import { InicioService } from 'src/app/services/inicio.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  personajes: IPersonaje[] = [];
  pagina = 0;
  next?: number|null;
  constructor(private inicioService: InicioService) { }

  ngOnInit(): void {
    this.paginacion();
  }

  paginacion() {
    console.log(this.pagina == this.next);
    if (this.pagina == this.next) {
      return;
    }
    this.pagina += 1;
    this.inicioService.getAllChrcter$(this.pagina)
    .pipe(tap(data => {
      // console.log(data);
      this.next = data.info.pages;
      this.personajes = data.results;
    }))
    .subscribe();
  }
  
}
