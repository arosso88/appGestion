import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CosechaslistaComponent } from './cosechaslista.component';

describe('CosechaslistaComponent', () => {
  let component: CosechaslistaComponent;
  let fixture: ComponentFixture<CosechaslistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CosechaslistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CosechaslistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
