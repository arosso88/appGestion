import { Component, OnInit, Input } from '@angular/core';
import { Articulos } from '../../../entities/Articulos';
import { ArticulosHttpService } from '../../../services/articulos-http.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from  '@angular/router';
import { DataService } from '../../../services/data.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-articulos-lista',
  templateUrl: './articulos-lista.component.html',
  styleUrls: ['./articulos-lista.component.css']
})
export class ArticulosListaComponent implements OnInit {
  articulos: Articulos[];
  dataSource: MatTableDataSource<Articulos>;
  displayedColumns = ['Id', 'Codigo', 'Descripcion', 'UM', 'acciones']

  constructor(
        private articulosHttpSrv: ArticulosHttpService,
        private _router: Router,
        private _dataService: DataService,
        private _loginService: LoginService) { }

  ngOnInit(): void {
    this._loginService.IrALoginPorTokenInvalido();
    this.CargarGrilla();
  }

  CargarGrilla() {
    this.articulosHttpSrv.GetAll().subscribe(
      articulos => {
        this.articulos = articulos;
        this.dataSource = new MatTableDataSource(this.articulos);
      }
    )
  }

  EditarArticulo(articulo: Articulos) {
    this._router.navigate(['/articulos', 'editar', articulo.art_Id]);
  }

  EliminarArticulo(articulo: Articulos) {
    this.articulosHttpSrv.Delete(articulo.art_Id).subscribe(
      () => {
        this.articulosHttpSrv.GetAll().subscribe(
          articulos => {
            this.articulos = articulos;
            this.dataSource = new MatTableDataSource(this.articulos);
          }
        )
      }
    );
  }

  Filtrar(filtro: string){
      this.articulosHttpSrv.FiltrarPorCodigo(filtro)
      .subscribe(x => {
        this.articulos = x;
        this.dataSource = new MatTableDataSource(this.articulos);
      })
  }

  Agregar() {
    this._router.navigate(['/articulos', 'agregar', 0]);
  }
}
