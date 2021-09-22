import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesComponent } from './pages.component';
import { GeneroEsPipe } from './pipes/genero-es.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('PagesComponent Pruebas', () => {
  let component: PagesComponent;
  let fixture: ComponentFixture<PagesComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesComponent ],
      imports: [
        // HttpClientModule,
        // HttpClientTestingModule,
        // RouterModule.forRoot([])
        RouterTestingModule 
      ], 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
