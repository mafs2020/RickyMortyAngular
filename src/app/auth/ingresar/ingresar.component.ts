import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

function comparePasswordF(c: AbstractControl): { [key: string]: boolean } | null {
  const password = c.get('password');
  const passwordConfirm = c.get('passwordDos');
  if( password?.value == passwordConfirm?.value ){
    return null;
  }
  return {'diferente': true};
}


@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.scss']
})
export class IngresarComponent implements OnInit {
  formulario!: FormGroup;
  register: boolean = true;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  iniciarFormulario(): void {
    this.formulario = this.fb.group({
      nombre: ['', {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(2)],
      }],
      comparePassword: this.fb.group({
        password: ['', {
          validators: [Validators.required, Validators.minLength(2)],
          // asyncValidators: []
        }],
        passwordDos: ['', [Validators.required, Validators.minLength(2)]],
      }, {validators: comparePasswordF} )
    });
  }

  
  get nombreControl(): AbstractControl {
    return this.formulario.get('nombre')!;
  }

  get passwordControl(): AbstractControl {
    return this.formulario.get('comparePassword.password')!;
  }
  get passwordControlDos(): AbstractControl {
    return this.formulario.get('comparePassword.passwordDos')!;
  }  

}
