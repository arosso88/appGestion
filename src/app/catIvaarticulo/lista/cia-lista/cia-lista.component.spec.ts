import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiaListaComponent } from './cia-lista.component';

describe('CiaListaComponent', () => {
  let component: CiaListaComponent;
  let fixture: ComponentFixture<CiaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiaListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
