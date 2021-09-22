import { TestBed } from '@angular/core/testing';

import { CrudService } from './crud.service';
import { IPersonaje } from '../interfaces';

describe('CrudService', () => {
  let service: CrudService;
  const user: IPersonaje = {
    id: 1,
    name: 'ggg',
    status: 'alive',
    species: 'human',
    type: 'string',
    gender: 'male',
    origin: { name: 'string', url: '' },
    image: 'string',
    favorito: true
  }
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('conseguir los favoritos', () => {
    expect(service.personajesGetter).toEqual([]);
  });

  it('prueba de setter y getter', () => {
    service.personajeSet = user;
    expect(service.personajesGetter).toEqual([user] as IPersonaje[]);
    service.eliminarPersonaje(user);
  });

  it('eliminar favoritos', () =>{
    service.eliminarPersonaje(user)
    expect(service.personajesGetter).not.toBeNull();
  });
});
