import { Component, OnInit } from '@angular/core';
import { Clientes } from '../../../entities/Clientes';
import { Router, ActivatedRoute } from  '@angular/router';
import { DataService } from '../../../services/data.service';
import { LoginService } from '../../../services/login.service';
import { ClientesService } from '../../../services/clientes.service';

@Component({
  selector: 'app-clientes-edicion',
  templateUrl: './clientes-edicion.component.html',
  styleUrls: ['./clientes-edicion.component.css']
})
export class ClientesEdicionComponent implements OnInit {
  clienteSeleccionado: Clientes;
  titulo: string;

  constructor(private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _dataService: DataService,
    private _loginService: LoginService,
    private _clienteService: ClientesService) { }

  ngOnInit(): void {
    this._loginService.IrALoginPorTokenInvalido();

    const id = Number(this._activeRoute.snapshot.paramMap.get('id'));
    const operacion = this._activeRoute.snapshot.paramMap.get("operacion");

    if (operacion === "agregar") {
      this.clienteSeleccionado = new Clientes(0,0,'','','');
      this.titulo = "Nuevo Cliente";
    }
    else {
      this._clienteService.Get(id).subscribe(cliente => this.clienteSeleccionado = cliente);
      this.titulo = "Editar Cliente";
    }
  }

  Guardar(form: any) {
    Object.keys(form).forEach((key, index) => this.clienteSeleccionado[key] = form[key]);

    if (this.clienteSeleccionado.cli_Id == 0) {
        this._clienteService.Add(this.clienteSeleccionado).subscribe();
    }
    else {
      this._clienteService.Update(this.clienteSeleccionado).subscribe();
    }

    this.Regresar();
  }

  Regresar() {
    this._router.navigate(['/clientes']);
  }

}
