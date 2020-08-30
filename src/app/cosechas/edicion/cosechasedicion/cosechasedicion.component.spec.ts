import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CosechasedicionComponent } from './cosechasedicion.component';

describe('CosechasedicionComponent', () => {
  let component: CosechasedicionComponent;
  let fixture: ComponentFixture<CosechasedicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CosechasedicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CosechasedicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
