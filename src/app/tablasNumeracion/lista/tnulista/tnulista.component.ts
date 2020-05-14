import { Component, OnInit } from '@angular/core';
import { TablasNumeracion } from '../../../entities/TablasNumeracion';
import { TnuServiceService } from '../../../services/tnu-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from  '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-tnulista',
  templateUrl: './tnulista.component.html',
  styleUrls: ['./tnulista.component.css']
})
export class TnulistaComponent implements OnInit {
  tnus: TablasNumeracion[];
  dataSource: MatTableDataSource<TablasNumeracion>;
  displayedColumns = ['Id', 'Descripcion', 'NroPuntoVenta', 'NroComprobante', 'Letra' , 'acciones']

  constructor(private _tnuService: TnuServiceService,
    private _router: Router,
    private _loginService: LoginService) { }

  ngOnInit(): void {
    this._loginService.IrALoginPorTokenInvalido();
    this.CargarGrilla();
  }

  CargarGrilla() {
    this._tnuService.GetAll().subscribe(
      tnus => {
        this.tnus = tnus;
        this.dataSource = new MatTableDataSource(this.tnus);
      }
    )
  }

  EditarTNU(tnu: TablasNumeracion) {
    this._router.navigate(['/tnu', 'editar', tnu.tnu_Id]);
  }

  EliminarTNU(tnu: TablasNumeracion) {
    this._tnuService.Delete(tnu.tnu_Id).subscribe(
      () => {
        this._tnuService.GetAll().subscribe(
          tnus => {
            this.tnus = tnus;
            this.dataSource = new MatTableDataSource(this.tnus);
          }
        )
      }
    );
  }

  Filtrar(filtro: string){
    this._tnuService.FiltrarPorCodigo(filtro)
    .subscribe(x => {
      this.tnus = x;
      this.dataSource = new MatTableDataSource(this.tnus);
    })
  }

  Agregar() {
    this._router.navigate(['/tnu', 'agregar', 0]);
  }

}
