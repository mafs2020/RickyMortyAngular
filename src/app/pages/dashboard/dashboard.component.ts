import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { IPersonaje, IRequest } from 'src/app/interfaces';
import { CrudService } from 'src/app/services/crud.service';

import { InicioService } from 'src/app/services/inicio.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  personajes: IPersonaje[] = [];
  pagina = 0;
  request?: IRequest;
  buscador = new FormControl('');
  buscadorSubject$:  Subject<string> = new Subject();
  buscadorSubject = this.buscadorSubject$.asObservable();
  dd: string = '';
  constructor(
    private inicioService: InicioService,
    private dos: CrudService
  ) { }

  ngOnInit(): void {
    // this.paginacion();
    this.buscador.valueChanges
      .pipe(
        debounceTime(500),
        startWith(''),
        tap(data => console.log(data)),
        takeUntil(this.buscadorSubject),
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
        catchError(err => of(err)),
      ).subscribe(r => this.request = r);

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
    }),
    takeUntil(this.buscadorSubject))
    .subscribe();
  }

  escribe(){
    this.buscadorSubject$.next(this.dd);
  }

  hola2(per: IPersonaje){
    this.personajes = this.personajes.filter(p => p.id != per.id);
    this.dos.eliminarPersonaje(per);
  }
  ngOnDestroy(): void {
    this.buscadorSubject$.next()
    this.buscadorSubject$.complete()
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
