import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY, of, Subject, throwError } from 'rxjs';
import { catchError, combineAll, concatAll, concatMap, debounceTime, distinctUntilChanged, map, mergeMap, switchMap, tap } from 'rxjs/operators';
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
  buscadorSubject$:  Subject<string> = new Subject();
  dd: string = '';
  buscadorSubject = this.buscadorSubject$.asObservable();
  constructor(private inicioService: InicioService) { }

  ngOnInit(): void {
    this.paginacion();
    this.buscador.valueChanges
      .pipe(
        debounceTime(500),
        tap(data => console.log(data)),
        distinctUntilChanged(),
        switchMap((dt) => this.inicioService.buscar(dt)),
        map(data => {
          try {
            data.results = this.inicioService.favoritos(data.results);
            return data;
          } catch (error) {
            return data;
          }
        }),
        catchError(err => of(err))
      ).subscribe(r => this.request = r);

      // this.buscadorSubject.pipe(
      //   debounceTime(500),
      //   tap(data => console.log(data)),
      //   // distinctUntilChanged(),
      //   mergeMap((dt) => this.inicioService.buscar(dt)),
      //   catchError(err => {console.error(err); return of(err)}),
      //   // tap(data => console.log(data))
      // ).subscribe();

  }

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

  escribe(){
    this.buscadorSubject$.next(this.dd);
  }
  
}

  // this.heroes$ = this.searchTerms.pipe(
  //   // wait 300ms after each keystroke before considering the term
  //   debounceTime(300),

  //   // ignore new term if same as previous term
  //   distinctUntilChanged(),

  //   // switch to new search observable each time the term changes
  //   switchMap((term: string) => this.heroService.searchHeroes(term)),
  // );
