import { Component, OnInit } from '@angular/core';
import { Articulos } from  '../../../entities/Articulos';
import { Router, ActivatedRoute } from  '@angular/router';
import { DataService } from '../../../services/data.service';
import { ArticulosHttpService } from '../../../services/articulos-http.service';
import { UnidadesMedidaHttpService } from '../../../services/unidades-medida-http.service';
import { UnidadesMedida } from '../../../entities/UnidadesMedida';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-articulos-edicion',
  templateUrl: './articulos-edicion.component.html',
  styleUrls: ['./articulos-edicion.component.css']
})
export class ArticulosEdicionComponent implements OnInit {
  articuloSeleccionado: Articulos;
  titulo: string;
  unidadesMedida: UnidadesMedida[];

  constructor(private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _dataService: DataService,
    private _articulosService: ArticulosHttpService,
    private _umeService: UnidadesMedidaHttpService,
    private _loginService: LoginService) { }

  ngOnInit(): void {
    this._loginService.IrALoginPorTokenInvalido();

    this.SetearUnidadesMedida();

    const id = Number(this._activeRoute.snapshot.paramMap.get('id'));
    const operacion = this._activeRoute.snapshot.paramMap.get("operacion");

    if (operacion === "agregar") {
      this.articuloSeleccionado = new Articulos(0, '', '', 0, '', '');
      this.titulo = "Nuevo Artículo";
    }
    else {
      this._articulosService.Get(id).subscribe(articulo => this.articuloSeleccionado = articulo);
      this.titulo = "Editar Artículo";
    }

    this._dataService.TituloEdicionArticulo$.subscribe(titulo => this.titulo = titulo);
  }

  SetearUnidadesMedida(){
    this._umeService.GetAll().subscribe(
      ume => { this.unidadesMedida = ume; }
    )
  }

  Guardar(form: any) {
    Object.keys(form).forEach((key, index) => this.articuloSeleccionado[key] = form[key]);

    if (this.articuloSeleccionado.art_Id == 0) {
        this._articulosService.Add(this.articuloSeleccionado).subscribe();
    }
    else {
      this._articulosService.Update(this.articuloSeleccionado).subscribe();
    }

    this.Regresar();
  }

  Regresar() {
    //this._router.navigateByUrl("/articulos", { skipLocationChange: false });

    this._router.navigate(['/articulos']);
  }
}
