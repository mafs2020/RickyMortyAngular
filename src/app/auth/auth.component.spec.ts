import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';

import { HttpClientModule } from '@angular/common/http'; 

describe('AuthComponent Prueba', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // declarations: [ AuthComponent ],
      // providers: [InicioService],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Debe de ser Creado', () => {
    expect(component).toBeTruthy();
  });
});
