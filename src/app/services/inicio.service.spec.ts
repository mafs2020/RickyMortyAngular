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

  it('regresar personjes', (done: DoneFn) => {
    expect( service.getAllChrcter$().subscribe(d => {
      expect(d).not.toBe(null);
      done();
    }))
  });
  it('regresar personjes con Link', (done: DoneFn) => {

    expect( service.getAllChrcter$('https://rickandmortyapi.com/api/character').subscribe(d => {
      expect(d).not.toBe(null);
      done();
    }));

  });

  it('regresa personajes por nombre', (done: DoneFn) => {
    service.buscar('').subscribe( v => {
      expect(v).not.toBeNull();
      done();
    })
  });


  it('#getter de favoritos', () => {
    expect(service.getsingleCharacter(1)  ).not.toBeNull();
  });

  it('#getter de favoritos Correcto', () => {
    expect(service.personajesGetter()  ).toEqual([]);
  });

  // it('regresar personjes del localstorge', () => {
  //   expect( service.personajesGetter(0) ).toBe([]);
  // });

});


