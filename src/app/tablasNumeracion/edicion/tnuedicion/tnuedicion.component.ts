import { Component, OnInit } from '@angular/core';
import { TablasNumeracion } from '../../../entities/TablasNumeracion';
import { Router, ActivatedRoute } from  '@angular/router';
import { DataService } from '../../../services/data.service';
import { LoginService } from '../../../services/login.service';
import { TnuServiceService } from '../../../services/tnu-service.service';

@Component({
  selector: 'app-tnuedicion',
  templateUrl: './tnuedicion.component.html',
  styleUrls: ['./tnuedicion.component.css']
})
export class TnuedicionComponent implements OnInit {
  tnuSeleccionada: TablasNumeracion;
  titulo: string;

  constructor(private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _dataService: DataService,
    private _loginService: LoginService,
    private _tnuService: TnuServiceService) { }

  ngOnInit(): void {
    this._loginService.IrALoginPorTokenInvalido();

    const id = Number(this._activeRoute.snapshot.paramMap.get('id'));
    const operacion = this._activeRoute.snapshot.paramMap.get("operacion");

    if (operacion === "agregar") {
      this.tnuSeleccionada = new TablasNumeracion(0, '', 0,0,'');
      this.titulo = "Nueva Tabla de Numeración";
    }
    else {
      this._tnuService.Get(id).subscribe(tnu => this.tnuSeleccionada = tnu);
      this.titulo = "Editar Tabla de Numeración";
    }
  }

  Guardar(form: any) {
    Object.keys(form).forEach((key, index) => this.tnuSeleccionada[key] = form[key]);

    if (this.tnuSeleccionada.tnu_Id == 0) {
        this._tnuService.Add(this.tnuSeleccionada).subscribe();
    }
    else {
      this._tnuService.Update(this.tnuSeleccionada).subscribe();
    }

    this.Regresar();
  }

  Regresar() {
    this._router.navigate(['/tnu']);
  }

}
