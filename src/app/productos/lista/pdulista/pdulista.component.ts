import { Component, OnInit } from '@angular/core';
import { Productos } from '../../../entities/Productos';
import { ProductosService } from '../../../services/productos.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from  '@angular/router';
import { LoginService } from '../../../services/login.service';


@Component({
  selector: 'app-pdulista',
  templateUrl: './pdulista.component.html',
  styleUrls: ['./pdulista.component.css']
})
export class PdulistaComponent implements OnInit {
  productos: Productos[];
  dataSource: MatTableDataSource<Productos>;
  displayedColumns = ['Id', 'Descripcion', 'acciones']

  constructor( private service: ProductosService,
    private _router: Router,
    private _loginService: LoginService) { }

  ngOnInit(): void {
    this._loginService.IrALoginPorTokenInvalido();
    this.CargarGrilla();
  }

  CargarGrilla() {
    this.service.GetAll().subscribe(
      productos => {
        this.productos = productos;
        this.dataSource = new MatTableDataSource(this.productos);
      }
    )
  }

  Editar(pdu: Productos) {
    this._router.navigate(['/productos', 'editar', pdu.pdu_Id]);
  }

  Eliminar(pdu: Productos) {
    this.service.Delete(pdu.pdu_Id).subscribe(
      () => {
        this.service.GetAll().subscribe(
          productos => {
            this.productos = productos;
            this.dataSource = new MatTableDataSource(this.productos);
          }
        )
      }
    );
  }

  Filtrar(filtro: string){
    this.service.FiltrarPorDescripcion(filtro)
    .subscribe(x => {
      this.productos = x;
      this.dataSource = new MatTableDataSource(this.productos);
    })
}

Agregar() {
  this._router.navigate(['/productos', 'agregar', 0]);
}

}
