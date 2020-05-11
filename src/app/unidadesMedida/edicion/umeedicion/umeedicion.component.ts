import { Component, OnInit } from '@angular/core';
import { UnidadesMedida } from '../../../entities/UnidadesMedida';
import { Router, ActivatedRoute } from  '@angular/router';
import { DataService } from '../../../services/data.service';
import { LoginService } from '../../../services/login.service';
import { UnidadesMedidaHttpService } from '../../../services/unidades-medida-http.service';

@Component({
  selector: 'app-umeedicion',
  templateUrl: './umeedicion.component.html',
  styleUrls: ['./umeedicion.component.css']
})
export class UmeedicionComponent implements OnInit {
  umeSeleccionada: UnidadesMedida;
  titulo: string;

  constructor(private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _dataService: DataService,
    private _loginService: LoginService,
    private _umeService: UnidadesMedidaHttpService) { }

  ngOnInit(): void {
    this._loginService.IrALoginPorTokenInvalido();

    const id = Number(this._activeRoute.snapshot.paramMap.get('id'));
    const operacion = this._activeRoute.snapshot.paramMap.get("operacion");

    if (operacion === "agregar") {
      this.umeSeleccionada = new UnidadesMedida(0, '', '');
      this.titulo = "Nueva Unidad de Medida";
    }
    else {
      this._umeService.Get(id).subscribe(ume => this.umeSeleccionada = ume);
      this.titulo = "Editar Unidad de Medida";
    }
  }

  Guardar(form: any) {
    Object.keys(form).forEach((key, index) => this.umeSeleccionada[key] = form[key]);

    if (this.umeSeleccionada.ume_Id == 0) {
        this._umeService.Add(this.umeSeleccionada).subscribe();
    }
    else {
      this._umeService.Update(this.umeSeleccionada).subscribe();
    }

    this.Regresar();
  }

  Regresar() {
    this._router.navigate(['/ume']);
  }

}
