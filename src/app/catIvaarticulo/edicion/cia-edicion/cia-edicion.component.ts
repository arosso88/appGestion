import { Component, OnInit } from '@angular/core';
import { CatIvaArticulo } from '../../../entities/CatIvaArticulo';
import { Router, ActivatedRoute } from  '@angular/router';
import { DataService } from '../../../services/data.service';
import { LoginService } from '../../../services/login.service';
import { CatIvaArtService } from '../../../services/cat-iva-art.service';

@Component({
  selector: 'app-cia-edicion',
  templateUrl: './cia-edicion.component.html',
  styleUrls: ['./cia-edicion.component.css']
})
export class CiaEdicionComponent implements OnInit {
  ciaSelecionado: CatIvaArticulo;
  titulo: string;

  constructor(private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _dataService: DataService,
    private _loginService: LoginService,
    private _ciaService: CatIvaArtService) { }

  ngOnInit(): void {
    this._loginService.IrALoginPorTokenInvalido();

    const id = Number(this._activeRoute.snapshot.paramMap.get('id'));
    const operacion = this._activeRoute.snapshot.paramMap.get("operacion");

    if (operacion === "agregar") {
      this.ciaSelecionado = new CatIvaArticulo(0, '', 0);
      this.titulo = "Nueva Categoría Iva Artículo";
    }
    else {
      this._ciaService.Get(id).subscribe(cia => this.ciaSelecionado = cia);
      this.titulo = "Editar Categoría Iva Artículo";
    }
  }

  Guardar(form: any) {
    Object.keys(form).forEach((key, index) => this.ciaSelecionado[key] = form[key]);

    if (this.ciaSelecionado.cia_Id == 0) {
        this._ciaService.Add(this.ciaSelecionado).subscribe();
    }
    else {
      this._ciaService.Update(this.ciaSelecionado).subscribe();
    }

    this.Regresar();
  }

  Regresar() {
    this._router.navigate(['/cia']);
  }

}
