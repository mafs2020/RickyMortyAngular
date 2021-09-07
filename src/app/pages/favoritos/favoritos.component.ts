import { Component, OnInit } from '@angular/core';
import { IPersonaje } from 'src/app/interfaces';
import { CrudService } from 'src/app/services/crud.service';
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
  constructor(
    private inicioService: InicioService,
    private dos: CrudService
  ) { }

  ngOnInit(): void {
    this.paginarBotones();
  }

  nPaginacion(num: number) {
    this.paginacion = this.paginacion + num ?? 0;
    try {
      this.personajes = this.inicioService.personajesGetter( this.paginacion );
    } catch (error) {
      console.log('error :>> ', error);
    }
    console.log(this.paginacion);
    console.log( this.limite );
  }

  hola2(per: IPersonaje){
    this.personajes = this.personajes.filter(p => p.id != per.id);
    this.dos.eliminarPersonaje(per);
    const todos = this.dos.personajesGetter;
    this.limite = Math.ceil(todos.length /20);
  }

  paginarBotones() {
    const todos = this.dos.personajesGetter;
    if( todos ) {
      this.limite = Math.ceil(todos.length /20);
      console.log( this.limite );
      this.nPaginacion(this.paginacion);
    } else {
      this.personajes = [];
    }
  }

}
