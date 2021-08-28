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
  url = "https://rickandmortyapi.com/api/character";
  info!: IInfo;
  personjesFvitos = this.personajesGetterTodo;

  constructor( private http: HttpClient) { }

  getAllChrcter$(siguiente: number): Observable<IRequest> {
    return this.http.get<IRequest>(`${this.url}/?page=${siguiente}`)
    .pipe(
      tap(data => this.info = data.info),
      map(data => {
        data.results = data.results.map((r: any) => {
          const { episode, ...rest } = r;
          for (let i = 0; i < this.personjesFvitos.length; i++) {
            const element = this.personjesFvitos[i];
            if(element.id == rest.id){
              rest.favorito = element.id == rest.id
              break;
            }
          }
          
          console.log(rest.favorito);
          return rest;
        })
        return data;
      }),
      // catchError(err => of()),
      catchError(err => throwError(err))
    );
  }

  personajesGetter(desde = 0) : IPersonaje[] {
    const l = localStorage.getItem(this.personajes) as string;
    let arreglos = JSON.parse(l) as IPersonaje[];
    let f = arreglos.slice((desde*20),(desde*20)+20);
    return arreglos.length > 0 ? f : [];
  }

  get personajesGetterTodo(): IPersonaje[] {
    const l = localStorage.getItem(this.personajes) as string;
    return l ? JSON.parse(l) : [];
  }

  set personaje(per: IPersonaje) {
    const f = this.personajesGetterTodo;
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

  eliminar(per: IPersonaje): void {
    let arreglo = this.personajesGetterTodo;
    arreglo = arreglo.filter( r => r.id != per.id);
    console.log('arreglo :>> ', arreglo);
    this.personajesSetter = arreglo;
  }

  set personajesSetter(personajes: IPersonaje[]) {
    localStorage.setItem(this.personajes, JSON.stringify(personajes));
  }

}
