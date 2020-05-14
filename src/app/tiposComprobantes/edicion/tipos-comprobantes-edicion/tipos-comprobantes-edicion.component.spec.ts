import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposComprobantesEdicionComponent } from './tipos-comprobantes-edicion.component';

describe('TiposComprobantesEdicionComponent', () => {
  let component: TiposComprobantesEdicionComponent;
  let fixture: ComponentFixture<TiposComprobantesEdicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposComprobantesEdicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposComprobantesEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
