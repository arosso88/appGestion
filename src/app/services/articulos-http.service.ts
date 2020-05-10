import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, ObservableLike } from 'rxjs';
import { map } from 'rxjs/operators';
import { Articulos } from '../entities/Articulos';
import { ArticulosDto } from  '../Dtos/ArticulosDto';

@Injectable({
  providedIn: 'root'
})
export class ArticulosHttpService {

  private _articulosURL = 'https://localhost:44355/articulos';

  constructor(
    private _httpClient: HttpClient
  ) { }

  GetAll(): Observable<Articulos[]> {
    return this._httpClient
      .get<ArticulosDto[]>(this._articulosURL)
      .pipe(
        map(dto => dto.map(art => this.GetArticulo(art)))
      );
  }

  Get(id: number): Observable<Articulos> {
    return this._httpClient
      .get<ArticulosDto>(this.GetUrlId(id))
      .pipe(
        map(x => this.GetArticulo(x))
      );
  }

  Delete(id: number): Observable<void> {
    return this._httpClient.delete<void>(this.GetUrlId(id));
  }

  Update(articulo: Articulos): Observable<void> {
    return this._httpClient.put<void>(this.GetUrlId(articulo.art_Id), this.GetDto(articulo))
  }

  Add(articulo: Articulos): Observable<void> {
    return this._httpClient.post<void>(this._articulosURL, this.GetDto(articulo))
  }

  GetUrlId(id: number): string {
    return `${this._articulosURL}/${id}`;
  }

  GetDto(articulo: Articulos): ArticulosDto {
    return new ArticulosDto(articulo.art_Id
      , articulo.art_Codigo
      , articulo.art_Descripcion
      , articulo.art_ume_Id
      , articulo.art_cia_Id
      , articulo.codigoUME
      , articulo.descripcionUME
      , articulo.descripcionCIA);
  }

  GetArticulo(dto: ArticulosDto): Articulos {
    return new Articulos(dto.art_Id
      , dto.art_Codigo
      , dto.art_Descripcion
      , dto.art_ume_Id
      , dto.art_cia_Id
      , dto.codigoUME
      , dto.descripcionUME
      , dto.descripcionCIA);
  }

  FiltrarPorCodigo(codigo: string): Observable<Articulos[]> {
    return this.GetAll()
      .pipe(
        map(x => x.filter(a => a.art_Codigo.toLowerCase().indexOf(codigo.toLowerCase()) >= 0))
      );
  }
}
