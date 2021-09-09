import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPersonaje } from 'src/app/interfaces';
import { InicioService } from 'src/app/services/inicio.service';

import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {
  @Input() personaje!: IPersonaje;
  @Input() lugar!: string;
  @Output() personajeEliminar = new EventEmitter<IPersonaje>();
  constructor(
    private toastr: ToastrService,
    private dos: CrudService,
    private router: Router
  ) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    // const svg = document.querySelectorAll('svg');
    // console.log(svg[0].setAttribute('fill', '#000')   );
  }

  guardar2() {
    this.personaje.favorito = true;
    this.dos.personajeSet = this.personaje;
    this.success();

  }
  
  eliminar2() {
    this.personaje.favorito = false;
    this.personajeEliminar.next(this.personaje);
    this.toastr.show('se borro de favoritos', `se borro a ${this.personaje.name}`);
  }

  success() {
    this.toastr.success('', `se agrego a ${this.personaje.name}`);
  }

  detalles(){
    this.router.navigate(['/inicio/detalle/', this.personaje.id]);
  }

}
