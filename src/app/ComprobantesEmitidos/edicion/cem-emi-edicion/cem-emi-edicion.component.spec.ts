import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CemEmiEdicionComponent } from './cem-emi-edicion.component';

describe('CemEmiEdicionComponent', () => {
  let component: CemEmiEdicionComponent;
  let fixture: ComponentFixture<CemEmiEdicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CemEmiEdicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CemEmiEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
