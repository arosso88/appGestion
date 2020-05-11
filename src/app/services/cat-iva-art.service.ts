import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, ObservableLike } from 'rxjs';
import { map } from 'rxjs/operators';
import { CatIvaArticulo } from '../entities/CatIvaArticulo';
import { CatIvaArticuloDto } from  '../Dtos/CatIvaArticuloDto';

@Injectable({
  providedIn: 'root'
})
export class CatIvaArtService {
  private _ciaURL = 'https://localhost:44355/categoriasIvaArticulo';
  private _cia: CatIvaArticulo[];

  constructor(private _httpClient: HttpClient) { }

  GetAll(): Observable<CatIvaArticulo[]> {
    return this._httpClient
    .get<CatIvaArticuloDto[]>(this._ciaURL)
    .pipe(
      map(dto => dto.map(cia => this.GetCIA(cia)))
    );
  }

  Get(id: number): Observable<CatIvaArticulo> {
    return this._httpClient
      .get<CatIvaArticuloDto>(this.GetUrlId(id))
      .pipe(
        map(x => this.GetCIA(x))
      );
  }

  Delete(id: number): Observable<void> {
    return this._httpClient.delete<void>(this.GetUrlId(id));
  }

  Update(cia: CatIvaArticulo): Observable<void> {
    return this._httpClient.put<void>(this.GetUrlId(cia.cia_Id), this.GetDto(cia))
  }

  Add(cia: CatIvaArticulo): Observable<void> {
    return this._httpClient.post<void>(this._ciaURL, this.GetDto(cia))
  }

  GetDto(cia: CatIvaArticulo): CatIvaArticuloDto {
    return new CatIvaArticuloDto(cia.cia_Id, cia.cia_Descripcion, cia.cia_PorcentajeIva);
  }

  GetUrlId(id: number): string {
    return `${this._ciaURL}/${id}`;
  }

  GetCIA(dto: CatIvaArticuloDto): CatIvaArticulo{
    return new CatIvaArticulo(dto.cia_Id, dto.cia_Descripcion, dto.cia_PorcentajeIva);
  }

  GetCategoriasIvaArticulo(): CatIvaArticulo[] {
    this.GetAll().subscribe(x => { this._cia = x; })
    return this._cia;
  }

  FiltrarPorCodigo(codigo: string): Observable<CatIvaArticulo[]> {
    return this.GetAll()
      .pipe(
        map(x => x.filter(a => a.cia_Descripcion.toLowerCase().indexOf(codigo.toLowerCase()) >= 0))
      );
  }
}
