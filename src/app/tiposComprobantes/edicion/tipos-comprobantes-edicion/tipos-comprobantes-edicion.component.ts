import { Component, OnInit } from '@angular/core';
import { TiposComprobantes } from  '../../../entities/TiposComprobantes';
import { Router, ActivatedRoute } from  '@angular/router';
import { TiposcomprobantesService } from '../../../services/tiposcomprobantes.service';
import { TnuServiceService } from '../../../services/tnu-service.service';
import { TablasNumeracion } from '../../../entities/TablasNumeracion';
import { LoginService } from '../../../services/login.service';
import { ItemListService } from '../../../services/item-list.service';
import { ItemList } from '../../../entities/ItemList';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-tipos-comprobantes-edicion',
  templateUrl: './tipos-comprobantes-edicion.component.html',
  styleUrls: ['./tipos-comprobantes-edicion.component.css']
})
export class TiposComprobantesEdicionComponent implements OnInit {
  tcoSeleccionado: TiposComprobantes;
  titulo: string;
  tnus: TablasNumeracion[];
  debCredV: ItemList[];
  debCredC: ItemList[];
  tcoTipos: ItemList[];
  movStock: ItemList[];
  emiReci: ItemList[];

  constructor(private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _tcoService: TiposcomprobantesService,
    private _tnuService: TnuServiceService,
    private _loginService: LoginService,
    private _itemListService: ItemListService) { }

  ngOnInit(): void {
    this._loginService.IrALoginPorTokenInvalido();

    this.SetearDebCredC();
    this.SetearDebCredV();
    this.SetearEmiReci();
    this.SetearMovStock();
    this.SetearTcoTipos();
    this.SetearTablasNumeracion();

    const id = Number(this._activeRoute.snapshot.paramMap.get('id'));
    const operacion = this._activeRoute.snapshot.paramMap.get("operacion");

    if (operacion === "agregar") {
      this.tcoSeleccionado = new TiposComprobantes(0,'','','','','',0,'E','', '');
      this.titulo = "Nuevo Tipo de Comprobante";
    }
    else {
      this._tcoService.Get(id).subscribe(tco => this.tcoSeleccionado = tco);
      this.titulo = "Editar Tipo de Comprobante";
    }

  }

  Guardar(form: any) {
    Object.keys(form).forEach((key, index) => this.tcoSeleccionado[key] = form[key]);

    if (this.tcoSeleccionado.tco_Id == 0) {
        this._tcoService.Add(this.tcoSeleccionado).subscribe();
    }
    else {
      this._tcoService.Update(this.tcoSeleccionado).subscribe();
    }

    this.Regresar();
  }

  Regresar() {
    this._router.navigate(['/tco']);
  }

  SetearTablasNumeracion(){
    this._tnuService.GetAll().subscribe(tnus => { this.tnus = tnus })
  }

  SetearDebCredV() {
    this.debCredV = this._itemListService.GetDebitosCreditos();
  }

  SetearDebCredC() {
    this.debCredC = this._itemListService.GetDebitosCreditos();
  }

  SetearTcoTipos() {
    this.tcoTipos = this._itemListService.GetTcoTipos();
  }

  SetearMovStock() {
    this.movStock = this._itemListService.GetMovimientoStock();
  }

  SetearEmiReci() {
    this.emiReci = this._itemListService.GetEmitidoRecibido();
  }

}
