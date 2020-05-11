import { Component, OnInit } from '@angular/core';
import { TiposMonedas } from '../../../entities/TiposMonedas';
import { TmoService } from '../../../services/tmo.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from  '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-tiposmonedaslista',
  templateUrl: './tiposmonedaslista.component.html',
  styleUrls: ['./tiposmonedaslista.component.css']
})
export class TiposmonedaslistaComponent implements OnInit {
  tmos: TiposMonedas[];
  dataSource: MatTableDataSource<TiposMonedas>;
  displayedColumns = ['Id', 'Descripcion', 'Simbolo' , 'acciones']

  constructor(private _tmoService: TmoService,
    private _router: Router,
    private _loginService: LoginService) { }

  ngOnInit(): void {
    this._loginService.IrALoginPorTokenInvalido();
    this.CargarGrilla();
  }

  CargarGrilla() {
    this._tmoService.GetAll().subscribe(
      tmos => {
        this.tmos = tmos;
        this.dataSource = new MatTableDataSource(this.tmos);
      }
    )
  }

  EditarTMO(tmo: TiposMonedas) {
    this._router.navigate(['/tmo', 'editar', tmo.tmo_Id]);
  }

  EliminarTMO(tmo: TiposMonedas) {
    this._tmoService.Delete(tmo.tmo_Id).subscribe(
      () => {
        this._tmoService.GetAll().subscribe(
          tmos => {
            this.tmos = tmos;
            this.dataSource = new MatTableDataSource(this.tmos);
          }
        )
      }
    );
  }

  Filtrar(filtro: string){
    this._tmoService.FiltrarPorCodigo(filtro)
    .subscribe(x => {
      this.tmos = x;
      this.dataSource = new MatTableDataSource(this.tmos);
    })
  }

  Agregar() {
    this._router.navigate(['/tmo', 'agregar', 0]);
  }
}
