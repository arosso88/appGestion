import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoComprobantesListaComponent } from './tipo-comprobantes-lista.component';

describe('TipoComprobantesListaComponent', () => {
  let component: TipoComprobantesListaComponent;
  let fixture: ComponentFixture<TipoComprobantesListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoComprobantesListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoComprobantesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
