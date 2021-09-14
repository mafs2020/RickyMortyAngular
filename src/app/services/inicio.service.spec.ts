import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

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
});
