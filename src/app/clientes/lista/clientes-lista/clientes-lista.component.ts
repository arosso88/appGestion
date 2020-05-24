import { Component, OnInit } from '@angular/core';
import { Clientes } from '../../../entities/Clientes';
import { ClientesService } from '../../../services/clientes.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from  '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {
  clientes: Clientes[];
  dataSource: MatTableDataSource<Clientes>;
  displayedColumns = ['Id', 'Codigo', 'Nombre' , 'Apellido', 'Direccion',  'acciones']

  constructor(private _clienteService: ClientesService,
    private _router: Router,
    private _loginService: LoginService) { }

  ngOnInit(): void {
    this._loginService.IrALoginPorTokenInvalido();
    this.CargarGrilla();
  }

  CargarGrilla() {
    this._clienteService.GetAll().subscribe(
      clientes => {
        this.clientes = clientes;
        this.dataSource = new MatTableDataSource(this.clientes);
      }
    )
  }

  EditarCliente(cliente: Clientes) {
    this._router.navigate(['/clientes', 'editar', cliente.cli_Id]);
  }

  EliminarCliente(cliente: Clientes) {
    this._clienteService.Delete(cliente.cli_Id).subscribe(
      () => {
        this._clienteService.GetAll().subscribe(
          clientes => {
            this.clientes = clientes;
            this.dataSource = new MatTableDataSource(this.clientes);
          }
        )
      }
    );
  }

  Filtrar(filtro: string){
    this._clienteService.FiltrarPorCodigo(filtro)
    .subscribe(x => {
      this.clientes = x;
      this.dataSource = new MatTableDataSource(this.clientes);
    })
  }

  Agregar() {
    this._router.navigate(['/clientes', 'agregar', 0]);
  }
}
