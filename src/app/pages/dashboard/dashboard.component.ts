import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { of, Subject } from 'rxjs';
import { catchError, debounceTime, delay, distinctUntilChanged, filter, map, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
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
  loading$ = this.inicioService.loader;
  response$ = this.inicioService.response$.pipe(tap(D => console.log(D)));
  constructor(
    private inicioService: InicioService,
    private dos: CrudService,
    private router: Router
  ) {
    // this.router.events.pipe(delay(1000))
    // .subscribe((e: Event) => this.checkEvents(e as RouterEvent));
  }

  ngOnInit(): void {
    // this.paginacion();
    this.buscador.valueChanges
      .pipe(
        debounceTime(500),
        startWith(''),
        tap(data => console.log(data)),
        takeUntil(this.buscadorSubject),
        distinctUntilChanged(),
        switchMap((dt) => this.inicioService.getAllChrcter$( undefined, dt)),
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

  paginacion(url?: string) {
    console.log(url);
    this.inicioService.getAllChrcter$(url)
    .pipe(tap(data => console.log(data)),
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

  checkEvents(routerEvent: RouterEvent): void {
    // console.log(routerEvent);
    if (routerEvent instanceof NavigationStart) {
      
    }

    if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
      
    }
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
