import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposmonedasedicionComponent } from './tiposmonedasedicion.component';

describe('TiposmonedasedicionComponent', () => {
  let component: TiposmonedasedicionComponent;
  let fixture: ComponentFixture<TiposmonedasedicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposmonedasedicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposmonedasedicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
