import { Component, OnInit } from '@angular/core';
import { TiposMonedas } from '../../../entities/TiposMonedas';
import { Router, ActivatedRoute } from  '@angular/router';
import { DataService } from '../../../services/data.service';
import { LoginService } from '../../../services/login.service';
import { TmoService } from '../../../services/tmo.service';

@Component({
  selector: 'app-tiposmonedasedicion',
  templateUrl: './tiposmonedasedicion.component.html',
  styleUrls: ['./tiposmonedasedicion.component.css']
})
export class TiposmonedasedicionComponent implements OnInit {
  tmoSeleccionado: TiposMonedas;
  titulo: string;

  constructor(private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _dataService: DataService,
    private _loginService: LoginService,
    private _tmoService: TmoService) { }

  ngOnInit(): void {
    this._loginService.IrALoginPorTokenInvalido();

    const id = Number(this._activeRoute.snapshot.paramMap.get('id'));
    const operacion = this._activeRoute.snapshot.paramMap.get("operacion");

    if (operacion === "agregar") {
      this.tmoSeleccionado = new TiposMonedas(0, '', '');
      this.titulo = "Nuevo Tipo de Moneda";
    }
    else {
      this._tmoService.Get(id).subscribe(tmo => this.tmoSeleccionado = tmo);
      this.titulo = "Editar Tipo de Moneda";
    }
  }

  Guardar(form: any) {
    Object.keys(form).forEach((key, index) => this.tmoSeleccionado[key] = form[key]);

    if (this.tmoSeleccionado.tmo_Id == 0) {
        this._tmoService.Add(this.tmoSeleccionado).subscribe();
    }
    else {
      this._tmoService.Update(this.tmoSeleccionado).subscribe();
    }

    this.Regresar();
  }

  Regresar() {
    this._router.navigate(['/tmo']);
  }

}
