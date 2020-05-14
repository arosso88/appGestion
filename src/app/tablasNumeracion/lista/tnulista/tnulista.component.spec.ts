import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TnulistaComponent } from './tnulista.component';

describe('TnulistaComponent', () => {
  let component: TnulistaComponent;
  let fixture: ComponentFixture<TnulistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TnulistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TnulistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
