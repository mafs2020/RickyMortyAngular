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
  register: boolean = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  iniciarFormulario(): void {
    this.formulario = this.fb.group({
      nombre: ['', {
        // updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(2)],
      }],
      comparePassword: this.fb.group({
        password: ['', {
          validators: [Validators.required, Validators.minLength(2)],
          // asyncValidators: []
        }],
        passwordDos: [''],
      // }, {validators: comparePasswordF} )
      })
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
  
  cambiar(): void {
    this.formulario.patchValue({
      nombre: '',
      comparePassword: {
        password: '',
        passwordDos: ''
      }
    });
    this.formulario.reset();
    this.register= !this.register;
    console.log('this.register :>> ', this.register);
    if(this.register) {
      this.formulario.get('comparePassword')?.setValidators(comparePasswordF);
      this.formulario.get('comparePassword.passwordDos')?.setValidators([Validators.required, Validators.minLength(2)])
      this.formulario.updateValueAndValidity();
    } else {
      // this.formulario?.clearValidators();
      this.formulario.get('comparePassword.passwordDos')?.clearValidators();
      this.formulario?.get('comparePassword')?.clearValidators();
      this.formulario?.updateValueAndValidity();
    }

  }

}
