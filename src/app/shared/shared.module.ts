import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

// formularios Reactivos
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
const modulos = [MatInputModule, MatButtonModule, MatProgressSpinnerModule];

@NgModule({
  declarations: [],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    ...modulos
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ...modulos
  ]
})
export class SharedModule { }
