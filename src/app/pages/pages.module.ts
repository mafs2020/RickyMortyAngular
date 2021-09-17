import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// rutas
import { PagesRoutingModule } from './pages-routing.module';

// shared
import { SharedModule } from '../shared/shared.module';

// pipe
import { GeneroEsPipe } from './pipes/genero-es.pipe';

// componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardComponent } from './components/card/card.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { DetallesComponent } from './detalles/detalles.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    CardComponent,
    FavoritosComponent,
    GeneroEsPipe,
    DetallesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
