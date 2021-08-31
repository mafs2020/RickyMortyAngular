import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPersonaje } from 'src/app/interfaces';
import { InicioService } from 'src/app/services/inicio.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {
  @Input() personaje!: IPersonaje;
  @Input() lugar!: string;
  @Output() personajeEliminar = new EventEmitter<IPersonaje>();
  constructor(private inicioService: InicioService, private toastr: ToastrService) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    // const svg = document.querySelectorAll('svg');
    // console.log(svg[0].setAttribute('fill', '#000')   );
  }

  guardar() {
    this.inicioService.personaje = this.personaje;
    this.personaje.favorito = true;
    // console.log(this.inicioService.personajesGetter());
    this.success();
  }

  eliminar() {
    this.personaje.favorito = false;
    this.personajeEliminar.next(this.personaje);
    this.toastr.show('se borro de favoritos', `se borro a ${this.personaje.name}`);
  }

  success() {
    this.toastr.success('', `se agrego a ${this.personaje.name}`);
  }
  
  eliminarDentro() {
    this.personaje.favorito = !this.personaje.favorito;
    this.inicioService.eliminar(this.personaje);
    this.toastr.success('', `se elimino a ${this.personaje.name}`);
  }

}
