import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, ObservableLike } from 'rxjs';
import { map } from 'rxjs/operators';
import { TablasNumeracion } from '../entities/TablasNumeracion';
import { TablasNumeracionDto } from  '../Dtos/TablasNumeracionDto';

@Injectable({
  providedIn: 'root'
})
export class TnuServiceService {

  private _tnuURL = 'https://localhost:44355/TablasNumeracion';
  private _tnu: TablasNumeracion[];

  constructor(private _httpClient: HttpClient) { }

  GetAll(): Observable<TablasNumeracion[]> {
    return this._httpClient
    .get<TablasNumeracionDto[]>(this._tnuURL)
    .pipe(
      map(dto => dto.map(tnu => this.GetTNU(tnu)))
    );
  }

  Get(id: number): Observable<TablasNumeracion> {
    return this._httpClient
      .get<TablasNumeracionDto>(this.GetUrlId(id))
      .pipe(
        map(x => this.GetTNU(x))
      );
  }

  Delete(id: number): Observable<void> {
    return this._httpClient.delete<void>(this.GetUrlId(id));
  }

  Update(tnu: TablasNumeracion): Observable<void> {
    return this._httpClient.put<void>(this.GetUrlId(tnu.tnu_Id), this.GetDto(tnu))
  }

  Add(tnu: TablasNumeracion): Observable<void> {
    return this._httpClient.post<void>(this._tnuURL, this.GetDto(tnu))
  }

  FiltrarPorCodigo(filtro: string): Observable<TablasNumeracion[]> {
    return this.GetAll()
      .pipe(
        map(x => x.filter(a => a.tnu_Descripcion.toLowerCase().indexOf(filtro.toLowerCase()) >= 0))
      );
  }

  GetUrlId(id: number): string {
    return `${this._tnuURL}/${id}`;
  }

  GetTNU(dto: TablasNumeracionDto): TablasNumeracion{
    return new TablasNumeracion(dto.tnu_Id, dto.tnu_Descripcion, dto.tnu_NroPuntoVenta, dto.tnu_NroComprobante, dto.tnu_Letra);
  }

  GetDto(tnu: TablasNumeracion): TablasNumeracionDto {
    return new TablasNumeracionDto(tnu.tnu_Id, tnu.tnu_Descripcion, tnu.tnu_NroPuntoVenta, tnu.tnu_NroComprobante, tnu.tnu_Letra);
  }
}
