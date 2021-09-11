import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, forkJoin, Observable, Subject } from 'rxjs';
import { catchError, map, mergeMap, switchMap, takeUntil, tap } from 'rxjs/operators';
import { IEpisodio } from 'src/app/interfaces';
import { InicioService } from 'src/app/services/inicio.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit, OnDestroy {
  data$?: Observable<any>;
  episodio?: Subject<string> = new Subject();
  episodio$ = this.episodio?.asObservable();
  opcion: string = '';
  episodioNgModel?: IEpisodio;
  select: FormControl = new FormControl();
  finalizar: Subject<never> = new Subject();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inicioService: InicioService
  ) { }

  ngOnInit(): void {
    
    // https://rickandmortyapi.com/api/character/2
    // console.log(this.route.snapshot.paramMap.get('id'));
    this.data$ = this.route.paramMap.pipe(
      takeUntil(this.finalizar),
      mergeMap(d => {
        if(isNaN(+d.get('id')!)){
          this.router.navigate(['/inicio']);
          return EMPTY;
        } else {
          return this.inicioService.getsingleCharacter(d.get('id')!)
        }
      })
    );
    // this.episodio$ = this.select.valueChanges.pipe(
    this.select.valueChanges.pipe(
      takeUntil(this.finalizar),
      switchMap(url => this.inicioService.getEpisodios(url)),

      // IEpisodio,
      tap((data: IEpisodio) => data.characters.map(() => {
        data.observbales = data.characters.map(url => {
          let arreglo: any = url.split('/');
          arreglo = arreglo[arreglo.length -1];
          return this.inicioService.getsingleCharacter(arreglo);
        });
      })),
      tap((d: IEpisodio) => forkJoin(d.observbales).pipe(
        map((f: any) => f.map((per:any) => per.image)),
        catchError(err => EMPTY)
      ).subscribe((g) =>  this.episodio?.next(g) )),
      // tap(f => console.log(f)),
      catchError(err => EMPTY)
    ).subscribe(d=> {
      const { observbales, ...resto } = d;
      this.episodioNgModel = resto;
    });
    // ).subscribe(d=> this.episodioNgModel = d);
  }

  ngOnDestroy(): void {
    this.finalizar.next();
    this.finalizar.complete();
  }

}

 /* this will emit each id as a value */
//  from(characterIds).pipe(

//   /* merge each id to an Observable of the http get request */
//   mergeMap(id => this.http.get(`https://swapi.co/api/people/${id}`)),

//   /* cancel any pending requests when the component unloads.
//     this will avoid any RxJS memory leaks */
//   takeUntil(this.endSubs$)
// ).subscribe(

  // switchMap((userSummaries) => {
  //   const userDetailObservables = userSummaries.map((s) =>
  //     from(loadUserDetails(s.id))
  //   );

  //   const userDetails$ = combineLatest(userDetailObservables);
  //   return userDetails$;
  // })

  // const userDetails$ = users$.pipe(
  //   switchMap((userSummaries) => {
  //     const userDetailObservables = userSummaries.map((s) =>
  //       from(loadUserDetails(s.id))
  //     );
  
  //     // ...
  //   })


  // ================================ PARALELO
  // const userDetails$ = users$.pipe(
  //   switchMap((userSummaries) => {
  //     const userDetailObservables = userSummaries.map((s) =>
  //       from(loadUserDetails(s.id))
  //     );
  
  //     const userDetails$ = combineLatest(userDetailObservables);
  //     return userDetails$;
  //   })

  // ===============EFICIENCIA
  // const userDetails$ = users$.pipe(
  //   switchMap((userSummaries) =>
  //     from(userSummaries).pipe(
  //       mergeMap((summary) => from(loadUserDetails(summary.id)), 4),
  //       toArray()
  //     )
  //   )
  // );