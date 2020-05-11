import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmeedicionComponent } from './umeedicion.component';

describe('UmeedicionComponent', () => {
  let component: UmeedicionComponent;
  let fixture: ComponentFixture<UmeedicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmeedicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmeedicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
