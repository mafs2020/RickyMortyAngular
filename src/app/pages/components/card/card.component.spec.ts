import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastrModule } from 'ngx-toastr';

import { CardComponent } from './card.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { GeneroEsPipe } from '../../pipes/genero-es.pipe';

describe('CardComponent Prueba', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  const pipe = new GeneroEsPipe();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // declarations: [ GeneroEsPipe ],
      // providers: [ GeneroEsPipe,  ],
      imports: [
        ToastrModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
