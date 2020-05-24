import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CemEmiComponent } from './cem-emi.component';

describe('CemEmiComponent', () => {
  let component: CemEmiComponent;
  let fixture: ComponentFixture<CemEmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CemEmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CemEmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
