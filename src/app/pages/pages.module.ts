import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardComponent } from './components/card/card.component';
import { FavoritosComponent } from './favoritos/favoritos.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    CardComponent,
    FavoritosComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
