import { Component, OnInit } from '@angular/core';
import { Cosechas } from '../../../entities/Cosechas';
import { CosechasService } from '../../../services/cosechas.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from  '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-cosechaslista',
  templateUrl: './cosechaslista.component.html',
  styleUrls: ['./cosechaslista.component.css']
})
export class CosechaslistaComponent implements OnInit {
  cosechas: Cosechas[];
  dataSource: MatTableDataSource<Cosechas>;
  displayedColumns = ['Id', 'Descripcion', 'acciones']

  constructor( private service: CosechasService,
    private _router: Router,
    private _loginService: LoginService) { }

  ngOnInit(): void {
    this._loginService.IrALoginPorTokenInvalido();
    this.CargarGrilla();
  }

  CargarGrilla() {
    this.service.GetAll().subscribe(
      cosechas => {
        this.cosechas = cosechas;
        this.dataSource = new MatTableDataSource(this.cosechas);
      }
    )
  }

  Editar(pch: Cosechas) {
    this._router.navigate(['/cosechas', 'editar', pch.pch_Id]);
  }

  Eliminar(pch: Cosechas) {
    this.service.Delete(pch.pch_Id).subscribe(
      () => {
        this.service.GetAll().subscribe(
          cosechas => {
            this.cosechas = cosechas;
            this.dataSource = new MatTableDataSource(this.cosechas);
          }
        )
      }
    );
  }

  Filtrar(filtro: string){
    this.service.FiltrarPorDescripcion(filtro)
    .subscribe(x => {
      this.cosechas = x;
      this.dataSource = new MatTableDataSource(this.cosechas);
    })
  }

  Agregar() {
    this._router.navigate(['/cosechas', 'agregar', 0]);
  }

}
