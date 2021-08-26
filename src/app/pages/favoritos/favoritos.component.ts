import { Component, OnInit } from '@angular/core';
import { IPersonaje } from 'src/app/interfaces';
import { InicioService } from 'src/app/services/inicio.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit {

  personajes: IPersonaje[] = [];
  constructor( private inicioService: InicioService ) { }

  ngOnInit(): void {
    this.getFavoritos();
  }

  getFavoritos(): void {
    this.personajes = this.inicioService.personajesGetter;
  }

  hola(per: IPersonaje){
    this.personajes = this.personajes.filter(p => p.id != per.id)
    this.inicioService.eliminar(per);
  }

}
