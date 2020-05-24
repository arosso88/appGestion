import { Component, OnInit } from '@angular/core';
import { Comprobantes } from '../../../entities/Comprobantes';
import { Router, ActivatedRoute } from  '@angular/router';
import { DataService } from '../../../services/data.service';
import { LoginService } from '../../../services/login.service';
import { ComprobantesService } from '../../../services/comprobantes.service';

@Component({
  selector: 'app-cem-emi-edicion',
  templateUrl: './cem-emi-edicion.component.html',
  styleUrls: ['./cem-emi-edicion.component.css']
})
export class CemEmiEdicionComponent implements OnInit {
  cemSeleccionado: Comprobantes;
  titulo: string;

  constructor(private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _dataService: DataService,
    private _loginService: LoginService,
    private _cemService: ComprobantesService) { }

  ngOnInit(): void {
    this._loginService.IrALoginPorTokenInvalido();

    const id = Number(this._activeRoute.snapshot.paramMap.get('id'));
    const operacion = this._activeRoute.snapshot.paramMap.get("operacion");

    if (operacion === "agregar") {
      this.cemSeleccionado = new Comprobantes(0,0,0,0,null,0,0,0,0,'',0,'',0,'','',0,0,'');
      this.titulo = "Nuevo Comprobante Emitido";
    }
    else {
      this._cemService.Get(id).subscribe(cem => this.cemSeleccionado = cem);
      this.titulo = "Editar Comprobante Emitido";
    }
  }

  Regresar() {
    this._router.navigate(['/cemEmi']);
  }

  Guardar(form: any) {

  }
}
