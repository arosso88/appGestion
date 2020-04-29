import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _tituloEdicionArticulo = new Subject<string>();
  public TituloEdicionArticulo$ = this._tituloEdicionArticulo.asObservable();

  private _tituloPrincipalSource = new Subject<string>();
  public TituloPrincipal$ = this._tituloPrincipalSource.asObservable();

  TituloEdicionArticulo(titulo: string) {
    this._tituloEdicionArticulo.next(titulo);
  }

  tituloPrincipal(titulo: string) {
    this._tituloPrincipalSource.next(titulo);
  }

  constructor() { }
}
