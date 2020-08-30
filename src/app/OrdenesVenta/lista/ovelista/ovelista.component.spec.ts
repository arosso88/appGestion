import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvelistaComponent } from './ovelista.component';

describe('OvelistaComponent', () => {
  let component: OvelistaComponent;
  let fixture: ComponentFixture<OvelistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvelistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvelistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
