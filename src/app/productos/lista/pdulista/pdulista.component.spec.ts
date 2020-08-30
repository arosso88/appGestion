import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdulistaComponent } from './pdulista.component';

describe('PdulistaComponent', () => {
  let component: PdulistaComponent;
  let fixture: ComponentFixture<PdulistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdulistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdulistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
