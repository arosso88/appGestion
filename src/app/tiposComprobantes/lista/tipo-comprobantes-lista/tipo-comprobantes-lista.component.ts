import { Component, OnInit } from '@angular/core';
import { TiposComprobantes } from '../../../entities/TiposComprobantes';
import { TiposcomprobantesService } from '../../../services/tiposcomprobantes.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from  '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-tipo-comprobantes-lista',
  templateUrl: './tipo-comprobantes-lista.component.html',
  styleUrls: ['./tipo-comprobantes-lista.component.css']
})
export class TipoComprobantesListaComponent implements OnInit {
  tcos: TiposComprobantes[];
  dataSource: MatTableDataSource<TiposComprobantes>;
  displayedColumns = ['Id', 'Codigo', 'Descripcion' , 'Tipo', 'DebCredV', 'DebCredC', 'EmiReci', 'TNU', 'MovStock' , 'acciones']

  constructor(private _tcoService: TiposcomprobantesService,
    private _router: Router,
    private _loginService: LoginService) { }

  ngOnInit(): void {
    this._loginService.IrALoginPorTokenInvalido();
    this.CargarGrilla();
  }

  CargarGrilla() {
    this._tcoService.GetAll('').subscribe(
      tcos => {
        this.tcos = tcos;
        this.dataSource = new MatTableDataSource(this.tcos);
      }
    )
  }

  EditarTCO(tco: TiposComprobantes) {
    this._router.navigate(['/tco', 'editar', tco.tco_Id]);
  }

  EliminarTCO(tco: TiposComprobantes) {
    this._tcoService.Delete(tco.tco_Id).subscribe(
      () => {
        this._tcoService.GetAll('').subscribe(
          tcos => {
            this.tcos = tcos;
            this.dataSource = new MatTableDataSource(this.tcos);
          }
        )
      }
    );
  }

  Filtrar(filtro: string){
    this._tcoService.FiltrarPorCodigo(filtro)
    .subscribe(x => {
      this.tcos = x;
      this.dataSource = new MatTableDataSource(this.tcos);
    })
  }

  Agregar() {
    this._router.navigate(['/tco', 'agregar', 0]);
  }

}
