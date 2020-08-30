import { Component, OnInit } from '@angular/core';
import { Cosechas } from  '../../../entities/Cosechas';
import { Router, ActivatedRoute } from  '@angular/router';
import { DataService } from '../../../services/data.service';
import { CosechasService } from '../../../services/cosechas.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-cosechasedicion',
  templateUrl: './cosechasedicion.component.html',
  styleUrls: ['./cosechasedicion.component.css']
})
export class CosechasedicionComponent implements OnInit {
  cosechaSeleccionada: Cosechas;
  titulo: string;

  constructor(private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _dataService: DataService,
    private _service: CosechasService,
    private _loginService: LoginService) { }

  ngOnInit(): void {
    this._loginService.IrALoginPorTokenInvalido();

    const id = String(this._activeRoute.snapshot.paramMap.get('id'));
    const operacion = this._activeRoute.snapshot.paramMap.get("operacion");

    if (operacion === "agregar") {
      this.cosechaSeleccionada = new Cosechas('','');
      this.titulo = "Nueva Cosecha";
    }
    else {
      this._service.Get(id).subscribe(pch => this.cosechaSeleccionada = pch);
      this.titulo = "Editar Cosecha";
    }

    this._dataService.TituloEdicionArticulo$.subscribe(titulo => this.titulo = titulo);
  }

  Guardar(form: any) {
    Object.keys(form).forEach((key, index) => this.cosechaSeleccionada[key] = form[key]);

    if (this.titulo == 'Nueva Cosecha') {
        this._service.Add(this.cosechaSeleccionada).subscribe();
    }
    else {
      this._service.Update(this.cosechaSeleccionada).subscribe();
    }

    this.Regresar();
  }

  Regresar() {
    this._router.navigate(['/cosechas']);
  }


}
