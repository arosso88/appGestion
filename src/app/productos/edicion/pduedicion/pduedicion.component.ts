import { Component, OnInit } from '@angular/core';
import { Productos } from  '../../../entities/Productos';
import { Router, ActivatedRoute } from  '@angular/router';
import { DataService } from '../../../services/data.service';
import { ProductosService } from '../../../services/productos.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-pduedicion',
  templateUrl: './pduedicion.component.html',
  styleUrls: ['./pduedicion.component.css']
})
export class PduedicionComponent implements OnInit {
  productoSeleccionado: Productos;
  titulo: string;

  constructor(private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _dataService: DataService,
    private _pduService: ProductosService,
    private _loginService: LoginService) { }

  ngOnInit(): void {
    this._loginService.IrALoginPorTokenInvalido();

    const id = String(this._activeRoute.snapshot.paramMap.get('id'));
    const operacion = this._activeRoute.snapshot.paramMap.get("operacion");

    if (operacion === "agregar") {
      this.productoSeleccionado = new Productos('','');
      this.titulo = "Nuevo Producto";
    }
    else {
      this._pduService.Get(id).subscribe(pdu => this.productoSeleccionado = pdu);
      this.titulo = "Editar Producto";
    }

    this._dataService.TituloEdicionArticulo$.subscribe(titulo => this.titulo = titulo);
  }

  Guardar(form: any) {
    Object.keys(form).forEach((key, index) => this.productoSeleccionado[key] = form[key]);

    if (this.titulo == 'Nuevo Producto') {
        this._pduService.Add(this.productoSeleccionado).subscribe();
    }
    else {
      this._pduService.Update(this.productoSeleccionado).subscribe();
    }

    this.Regresar();
  }

  Regresar() {
    this._router.navigate(['/productos']);
  }

}
