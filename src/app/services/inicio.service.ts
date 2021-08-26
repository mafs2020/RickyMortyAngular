import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { IInfo, IPersonaje, IRequest } from '../interfaces';

import { catchError, filter, map, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InicioService {
  dinero?: number;
  personajes = 'personajes';
  url = "https://rickandmortyapi.com/api/character"
  info!: IInfo;

  constructor( private http: HttpClient) { }

  getAllChrcter$(siguiente: number): Observable<IRequest|never> {
    return this.http.get<IRequest>(`${this.url}/?page=${siguiente}`)
    .pipe(
      tap(data => this.info = data.info),
      map(data => {
        data.results = data.results.map((r: any) => {
          const { episode, ...rest } = r;
          return rest;
        })
        return data;
      }),
      // catchError(err => of()),
      catchError(err => throwError(err))
    );
  }

  get personajesGetter() : IPersonaje[] {
    const l = localStorage.getItem(this.personajes) as string;
    return l ? JSON.parse(l) : [];
  }

  set personaje(per: IPersonaje) {
    const f = this.personajesGetter;
    let agregar = false;
    for (let i = 0; i < f.length; i++) {
      if(f[i].id == per.id){
        agregar = true;
        break;
      }
    }
    agregar ? '' : f.push(per);
    localStorage.setItem(this.personajes, JSON.stringify(f));
  }

}
