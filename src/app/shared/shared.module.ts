import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// formularios Reactivos
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  exports: [
    ReactiveFormsModule,
    FormsModule
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
