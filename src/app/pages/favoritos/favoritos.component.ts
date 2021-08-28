import { Component, OnInit } from '@angular/core';
import { IPersonaje } from 'src/app/interfaces';
import { InicioService } from 'src/app/services/inicio.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit {
  paginacion: number = 0;
  personajes: IPersonaje[] = [];
  limite?: number;
  constructor( private inicioService: InicioService ) { }

  ngOnInit(): void {
    const todos = this.inicioService.personajesGetterTodo;
    this.limite = Math.ceil((todos.length -1) /20);
    this.nPaginacion(this.paginacion);
  }

  nPaginacion(num: number) {
    this.paginacion = this.paginacion + num;
    this.personajes = this.inicioService.personajesGetter( this.paginacion );
    console.log(this.paginacion);
  }

  hola(per: IPersonaje){
    this.personajes = this.personajes.filter(p => p.id != per.id)
    this.inicioService.eliminar(per);
  }

}
