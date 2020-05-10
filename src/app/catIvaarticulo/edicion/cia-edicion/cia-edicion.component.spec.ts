import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiaEdicionComponent } from './cia-edicion.component';

describe('CiaEdicionComponent', () => {
  let component: CiaEdicionComponent;
  let fixture: ComponentFixture<CiaEdicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiaEdicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiaEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
