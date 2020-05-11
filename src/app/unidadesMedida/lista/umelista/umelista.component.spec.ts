import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmelistaComponent } from './umelista.component';

describe('UmelistaComponent', () => {
  let component: UmelistaComponent;
  let fixture: ComponentFixture<UmelistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmelistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmelistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
