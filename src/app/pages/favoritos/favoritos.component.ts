import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { CrudService } from 'src/app/services/crud.service';
import { InicioService } from 'src/app/services/inicio.service';

import { IPersonaje } from 'src/app/interfaces';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit {
  paginacion: number = 0;
  personajes: IPersonaje[] = [];
  limite?: number;
  constructor(
    private inicioService: InicioService,
    private dos: CrudService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.paginarBotones();
    this.title.setTitle('Rick and Morty Favoritos');
  }

  nPaginacion(num: number) {
<<<<<<< HEAD
    this.paginacion = this.paginacion + num ?? 0;
    try {
      this.personajes = this.inicioService.personajesGetter( this.paginacion );
    } catch (error) {
      console.log('error :>> ', error);
    }
=======
    this.paginacion = this.paginacion + num;
    if(this.paginacion < 0){
      this.paginacion = 0;
    }
    this.personajes = this.inicioService.personajesGetter( this.paginacion );
>>>>>>> ssr
    console.log(this.paginacion);
    console.log('this.limite :>> ', this.limite);
  }

  hola2(per: IPersonaje){
    this.personajes = this.personajes.filter(p => p.id != per.id);
    this.dos.eliminarPersonaje(per);
    const todos = this.dos.personajesGetter;
    this.limite = Math.ceil(todos.length /20);
  }

  paginarBotones() {
    const todos = this.dos.personajesGetter;
<<<<<<< HEAD
    if( todos ) {
      this.limite = Math.ceil(todos.length /20);
      console.log( this.limite );
      this.nPaginacion(this.paginacion);
    } else {
      this.personajes = [];
    }
=======
    this.limite = Math.ceil(todos.length /20) ?? 0;
    console.log( this.limite );
    this.nPaginacion(this.paginacion);
>>>>>>> ssr
  }

}
