import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IEpisodio, IPersonaje } from '../interfaces';

import { InicioService } from './inicio.service';

describe('InicioService Prueba', () => {
  let service: InicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: []
    });
    service = TestBed.inject(InicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('regresar personjes', () => {
    expect( service.getAllChrcter$().subscribe(d => {
      expect(d).not.toBe(null);
    }))
  });

  // it('regresar personjes del localstorge', () => {
  //   expect( service.personajesGetter(0) ).toBe([]);
  // });

});


