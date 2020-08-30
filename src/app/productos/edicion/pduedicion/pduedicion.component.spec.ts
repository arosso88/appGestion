import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PduedicionComponent } from './pduedicion.component';

describe('PduedicionComponent', () => {
  let component: PduedicionComponent;
  let fixture: ComponentFixture<PduedicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PduedicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PduedicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
