import { Injectable } from '@angular/core';
import { IPersonaje } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  personajesKey = 'personajes';
  constructor() { }

  // obtener personajes
  get personajesGetter(): IPersonaje[] {
    let arreglo: any = localStorage.getItem( this.personajesKey );
    arreglo = arreglo ? JSON.parse(arreglo) : [];
    return arreglo;
  }

  // agregr personjes
  set personajeSet(per: IPersonaje) {
    let personajes = this.personajesGetter;
    personajes.push(per);
    this.personajesSet = personajes;
  }

  // setear personjes
  private set personajesSet(pers: IPersonaje[]) {
    localStorage.setItem(this.personajesKey, JSON.stringify(pers));
  }

  // eliminar
  eliminarPersonaje(personaje: IPersonaje) {
    const arreglo = this.personajesGetter.filter(per => personaje.id != per.id);
    this.personajesSet = arreglo;
  }

  favoritos(personajes: IPersonaje[]): IPersonaje[] {
    const d = personajes.map((r: any) => {
      const { episode, ...rest } = r;
      for (let i = 0; i < this.personajesGetter.length; i++) {
        const element = this.personajesGetter[i];
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

}
