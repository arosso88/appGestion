import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OveedicionComponent } from './oveedicion.component';

describe('OveedicionComponent', () => {
  let component: OveedicionComponent;
  let fixture: ComponentFixture<OveedicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OveedicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OveedicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
