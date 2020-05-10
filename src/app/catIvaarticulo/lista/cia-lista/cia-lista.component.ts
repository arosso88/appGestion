import { Component, OnInit } from '@angular/core';
import { CatIvaArticulo } from '../../../entities/CatIvaArticulo';
import { CatIvaArtService } from '../../../services/cat-iva-art.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from  '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-cia-lista',
  templateUrl: './cia-lista.component.html',
  styleUrls: ['./cia-lista.component.css']
})
export class CiaListaComponent implements OnInit {
  cias: CatIvaArticulo[];
  dataSource: MatTableDataSource<CatIvaArticulo>;
  displayedColumns = ['Id', 'Descripcion', 'PorcentajeIva' , 'acciones']

  constructor(private _ciaService: CatIvaArtService,
        private _router: Router,
        private _loginService: LoginService
  ) { }

  ngOnInit(): void {
    this._loginService.IrALoginPorTokenInvalido();
    this.CargarGrilla();
  }

  CargarGrilla() {
    this._ciaService.GetAll().subscribe(
      cias => {
        this.cias = cias;
        this.dataSource = new MatTableDataSource(this.cias);
      }
    )
  }

  EditarCIA(cia: CatIvaArticulo) {
    this._router.navigate(['/cia', 'editar', cia.cia_Id]);
  }


  EliminarCIA(cia: CatIvaArticulo) {
    this._ciaService.Delete(cia.cia_Id).subscribe(
      () => {
        this._ciaService.GetAll().subscribe(
          cias => {
            this.cias = cias;
            this.dataSource = new MatTableDataSource(this.cias);
          }
        )
      }
    );
  }

  Filtrar(filtro: string){
    this._ciaService.FiltrarPorCodigo(filtro)
    .subscribe(x => {
      this.cias = x;
      this.dataSource = new MatTableDataSource(this.cias);
    })
  }

  Agregar() {
    this._router.navigate(['/cia', 'agregar', 0]);
  }
}
