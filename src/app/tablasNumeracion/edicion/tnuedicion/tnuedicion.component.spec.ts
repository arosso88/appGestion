import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TnuedicionComponent } from './tnuedicion.component';

describe('TnuedicionComponent', () => {
  let component: TnuedicionComponent;
  let fixture: ComponentFixture<TnuedicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TnuedicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TnuedicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
