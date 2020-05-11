import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesEdicionComponent } from './clientes-edicion.component';

describe('ClientesEdicionComponent', () => {
  let component: ClientesEdicionComponent;
  let fixture: ComponentFixture<ClientesEdicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesEdicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
