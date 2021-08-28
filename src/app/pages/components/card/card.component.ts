import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPersonaje } from 'src/app/interfaces';
import { InicioService } from 'src/app/services/inicio.service';

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
  constructor(private inicioService: InicioService) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    // const svg = document.querySelectorAll('svg');
    // console.log(svg[0].setAttribute('fill', '#000')   );
  }

  guardar() {
    this.inicioService.personaje = this.personaje;
    
    console.log(this.inicioService.personajesGetter());
  }

  eliminar() {
    this.personajeEliminar.next(this.personaje);
  }

}
