import { Component, OnInit } from '@angular/core';
import { UnidadesMedida } from '../../../entities/UnidadesMedida';
import { UnidadesMedidaHttpService } from '../../../services/unidades-medida-http.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from  '@angular/router';
import { LoginService } from '../../../services/login.service';


@Component({
  selector: 'app-umelista',
  templateUrl: './umelista.component.html',
  styleUrls: ['./umelista.component.css']
})
export class UmelistaComponent implements OnInit {
  umes: UnidadesMedida[];
  dataSource: MatTableDataSource<UnidadesMedida>;
  displayedColumns = ['Id', 'Codigo', 'Descripcion' , 'acciones']

  constructor(private _umeService: UnidadesMedidaHttpService,
    private _router: Router,
    private _loginService: LoginService) { }

  ngOnInit(): void {
    this._loginService.IrALoginPorTokenInvalido();
    this.CargarGrilla();
  }

  CargarGrilla() {
    this._umeService.GetAll().subscribe(
      umes => {
        this.umes = umes;
        this.dataSource = new MatTableDataSource(this.umes);
      }
    )
  }

  EditarUME(ume: UnidadesMedida) {
    this._router.navigate(['/ume', 'editar', ume.ume_Id]);
  }

  EliminarUME(ume: UnidadesMedida) {
    this._umeService.Delete(ume.ume_Id).subscribe(
      () => {
        this._umeService.GetAll().subscribe(
          umes => {
            this.umes = umes;
            this.dataSource = new MatTableDataSource(this.umes);
          }
        )
      }
    );
  }

  Filtrar(filtro: string){
    this._umeService.FiltrarPorCodigo(filtro)
    .subscribe(x => {
      this.umes = x;
      this.dataSource = new MatTableDataSource(this.umes);
    })
  }

  Agregar() {
    this._router.navigate(['/ume', 'agregar', 0]);
  }
}
