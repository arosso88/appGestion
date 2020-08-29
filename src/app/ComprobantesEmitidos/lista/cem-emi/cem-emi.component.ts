import { Component, OnInit } from '@angular/core';
import { Comprobantes } from '../../../entities/Comprobantes';
import { ComprobantesService } from '../../../services/comprobantes.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from  '@angular/router';
import { LoginService } from '../../../services/login.service';
import { GrillaArticulosDto } from 'src/app/Dtos/GrillaArticulosDto';

@Component({
  selector: 'app-cem-emi',
  templateUrl: './cem-emi.component.html',
  styleUrls: ['./cem-emi.component.css']
})
export class CemEmiComponent implements OnInit {
  cemEmitidos: Comprobantes[];
  dataSource: MatTableDataSource<Comprobantes>;
  displayedColumns = ['Id', 'Fecha', 'TcoCodigo' , 'PtoVenta' , 'Numero', 'Letra', 'Vendedor', 'Comprador', 'Moneda' ,'Subtotal', 'Iva', 'Total',  'acciones']

  constructor(private _cemService: ComprobantesService,
    private _router: Router,
    private _loginService: LoginService) { }

  ngOnInit(): void {
    this._loginService.IrALoginPorTokenInvalido();
    this.CargarGrilla();
  }

  CargarGrilla() {
    this._cemService.GetAll('E').subscribe(
      cemEmitidos => {
        this.cemEmitidos = cemEmitidos;
        this.dataSource = new MatTableDataSource(this.cemEmitidos);
      }
    )
  }

  EditarCEM(cem: Comprobantes) {
    this._router.navigate(['/cemEmi', 'editar', cem.cem_Id]);
  }

  Agregar() {
    this._router.navigate(['/cemEmi', 'agregar', 0]);
  }

  EliminarCEM(cem: Comprobantes) {
    this._cemService.Delete(cem.cem_Id).subscribe(
      () => {
        this._cemService.GetAll('E').subscribe(
          cemEmitidos => {
            this.cemEmitidos = cemEmitidos;
            this.dataSource = new MatTableDataSource(this.cemEmitidos);
          }
        )
      }
    );
  }

  Filtrar(filtro: string){
    this._cemService.FiltrarPorComprador(filtro, 'E')
    .subscribe(x => {
      this.cemEmitidos = x;
      this.dataSource = new MatTableDataSource(this.cemEmitidos);
    })
  }
}
