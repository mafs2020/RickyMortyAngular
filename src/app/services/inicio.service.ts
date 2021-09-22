import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { IInfo, IPersonaje, IRequest } from '../interfaces';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})

export class InicioService {
  dinero?: number;
  personajes = 'personajes';
  url = "https://rickandmortyapi.com/api/character";
  info!: IInfo;
  personjesFvitos: IPersonaje[] = [];

  constructor(
    private http: HttpClient,
    private dos: CrudService
  ) { }

  getAllChrcter$(url: string = this.url): Observable<IRequest|null> {
    if(!url) {
      return of();
    }
    return this.http.get<IRequest>(`${url}`)
    .pipe(
      tap(data => this.info = data.info),
      map(data => {
        data.results = this.favoritos(data.results);
        return data;
      }),
      catchError(err => of(err)),
      catchError(err => throwError(err))
    );
  }

  personajesGetter(desde = 0) : IPersonaje[] {
    const l = localStorage.getItem(this.personajes) as string;
    const arreglos = JSON.parse(l) as IPersonaje[] ?? [];
    // console.log('arreglos :>> ', arreglos);
    let f = arreglos.slice((desde*20),(desde*20)+20);
    return arreglos.length > 0 ? f : [];
  }

  
  buscar(termino: string): Observable<IRequest>{
    // ?name=rick&status=alive
    // const params = new HttpParams().set('name', 'rick').set('status', 'alive');
    return this.http.get<IRequest>(`${this.url}`, { params: { name: termino } })
      .pipe(catchError(err => of(err)));
  }

  favoritos(personajes: IPersonaje[]): IPersonaje[] {
    const pers = this.dos.personajesGetter;
    const d = personajes.map((r: any) => {
      const { episode, ...rest } = r;
      for (let i = 0; i < pers.length; i++) {
        const element = pers[i];
        if(element.id == rest.id) {
          rest.favorito = element.id == rest.id
          break;
        }
      }
      console.log(rest.favorito);
      return rest;
    });
    return d;
  }

  getsingleCharacter(id:string|number): Observable<any>{
    return this.http.get<any>(`https://rickandmortyapi.com/api/character/${id}`)
      .pipe(catchError(err => of(err)));
  }

  getEpisodios(url: string): Observable<any>{
    return this.http.get<any>(`${url}`)
      .pipe(catchError(err => of(err)));
  }

}


// data.results = data.results.map((r: any) => {
//   const { episode, ...rest } = r;
//   for (let i = 0; i < this.personjesFvitos.length; i++) {
//     const element = this.personjesFvitos[i];
//     if(element.id == rest.id){
//       rest.favorito = element.id == rest.id
//       break;
//     }
//   }
//   console.log(rest.favorito);
//   return rest;
// });
// return data;