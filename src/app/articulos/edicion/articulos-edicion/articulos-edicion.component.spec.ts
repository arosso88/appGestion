import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosEdicionComponent } from './articulos-edicion.component';

describe('ArticulosEdicionComponent', () => {
  let component: ArticulosEdicionComponent;
  let fixture: ComponentFixture<ArticulosEdicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticulosEdicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
