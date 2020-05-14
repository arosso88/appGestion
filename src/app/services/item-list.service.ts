import { Injectable } from '@angular/core';
import { ItemList } from '../entities/ItemList';

@Injectable({
  providedIn: 'root'
})
export class ItemListService {

  private _debitosCredito: ItemList[] = [
    new ItemList('', ''),
    new ItemList('C', 'Crédito'),
    new ItemList('D', 'Débito')
  ];

  private _tcoTipos: ItemList[] = [
    new ItemList('',''),
    new ItemList('FV', 'Factura Venta'),
    new ItemList('FC', 'Factura Compra'),
    new ItemList('RE', 'Remito Entrada'),
    new ItemList('RS', 'Remito Salida')
  ];

  private _emitidosRecibidos: ItemList[] = [
    new ItemList('E', 'Emitido'),
    new ItemList('R', 'Recibidos')
  ];

  private _movStock: ItemList[] = [
    new ItemList('',''),
    new ItemList('E', 'Entrada'),
    new ItemList('S', 'Salida')
  ];

  constructor() { }

  GetDebitosCreditos(): ItemList[] {
    return this._debitosCredito;
  }

  GetTcoTipos(): ItemList[] {
    return this._tcoTipos;
  }

  GetEmitidoRecibido(): ItemList[] {
    return this._emitidosRecibidos;
  }

  GetMovimientoStock(): ItemList[] {
    return this._movStock;
  }
}
