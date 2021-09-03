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
    const todos = this.dos.personajesGetter;
    this.limite = Math.ceil(todos.length /20);
    console.log( this.limite );
    this.nPaginacion(this.paginacion);
  }

  nPaginacion(num: number) {
    this.paginacion = this.paginacion + num;
    this.personajes = this.inicioService.personajesGetter( this.paginacion );
    console.log(this.paginacion);
    console.log( this.limite );
  }

  hola2(per: IPersonaje){
    this.personajes = this.personajes.filter(p => p.id != per.id);
    this.dos.eliminarPersonaje(per);
  }

}
