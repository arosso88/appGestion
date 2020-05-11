import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposmonedaslistaComponent } from './tiposmonedaslista.component';

describe('TiposmonedaslistaComponent', () => {
  let component: TiposmonedaslistaComponent;
  let fixture: ComponentFixture<TiposmonedaslistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposmonedaslistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposmonedaslistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
