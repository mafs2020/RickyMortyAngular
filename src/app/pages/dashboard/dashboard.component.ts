import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, of, throwError } from 'rxjs';
import { catchError, combineAll, concatAll, concatMap, debounceTime, delay, delayWhen, distinctUntilChanged, mergeMap, retry, retryWhen, tap } from 'rxjs/operators';
import { IPersonaje, IRequest } from 'src/app/interfaces';

import { InicioService } from 'src/app/services/inicio.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  personajes: IPersonaje[] = [];
  pagina = 0;
  request?: IRequest;
  buscador = new FormControl('');
  d?: string;
  constructor(private inicioService: InicioService) { }

  ngOnInit(): void {
    console.log(!!this.request?.info?.next);
    this.paginacion();
    this.buscador.valueChanges
      .pipe(
        tap(data => console.log(data)),
        debounceTime(500),
        tap(data => console.log(data)),
        distinctUntilChanged(),
        mergeMap((dt) => this.inicioService.buscar(dt)),
        catchError(err => of()),
        catchError(error => {
          if (error.status === 401 || error.status === 403 ) {
            // handle error
          }
          this.buscador.reset;
          return throwError(error);
        })

        // throwError(err)
      ).subscribe(r => console.log(r));
  }
  // regresar() {
  //   const d = combineLatest([mergeMap(() => this.inicioService.buscar( this.buscador.value ))]);
  // }

  paginacion(atras?: boolean) {
    let urll = atras ? this.request?.info?.prev! : this.request?.info?.next!;
    this.inicioService.getAllChrcter$(urll)
    .pipe(tap(data => {
      if(!data){
        return;
      }
      this.request = data;
      console.log(!!this.request?.info?.next);
    }))
    .subscribe();
  }

  saverange(data: any) {
    console.log('object');
    console.log('data :>> ', data);
    this.d;
  }
  
}
