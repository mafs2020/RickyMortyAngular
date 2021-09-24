import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modulo de shared
import { SharedModule } from '../shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { IngresarComponent } from './ingresar/ingresar.component';



@NgModule({
  declarations: [
    AuthComponent,
    IngresarComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
