import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, ObservableLike } from 'rxjs';
import { map } from 'rxjs/operators';
import { TiposMonedas } from '../entities/TiposMonedas';
import { TiposMonedasDto } from  '../Dtos/TiposMonedasDto';

@Injectable({
  providedIn: 'root'
})
export class TmoService {

  private _tmoURL = 'https://localhost:44355/tiposmonedas';
  private _tmo: TiposMonedas[];

  constructor(
    private _httpClient: HttpClient
  ) { }

  GetAll(): Observable<TiposMonedas[]> {
    return this._httpClient
    .get<TiposMonedasDto[]>(this._tmoURL)
    .pipe(
      map(dto => dto.map(tmo => this.GetTMO(tmo)))
    );
  }

  Get(id: number): Observable<TiposMonedas> {
    return this._httpClient
      .get<TiposMonedasDto>(this.GetUrlId(id))
      .pipe(
        map(x => this.GetTMO(x))
      );
  }

  Delete(id: number): Observable<void> {
    return this._httpClient.delete<void>(this.GetUrlId(id));
  }

  Update(tmo: TiposMonedas): Observable<void> {
    return this._httpClient.put<void>(this.GetUrlId(tmo.tmo_Id), this.GetDto(tmo))
  }

  Add(tmo: TiposMonedas): Observable<void> {
    return this._httpClient.post<void>(this._tmoURL, this.GetDto(tmo))
  }

  FiltrarPorCodigo(filtro: string): Observable<TiposMonedas[]> {
    return this.GetAll()
      .pipe(
        map(x => x.filter(a => a.tmo_Descripcion.toLowerCase().indexOf(filtro.toLowerCase()) >= 0))
      );
  }

  GetUrlId(id: number): string {
    return `${this._tmoURL}/${id}`;
  }

  GetTMO(dto: TiposMonedasDto): TiposMonedas{
    return new TiposMonedas(dto.tmo_Id, dto.tmo_Descripcion, dto.tmo_Simbolo);
  }

  GetDto(tmo: TiposMonedas): TiposMonedasDto {
    return new TiposMonedasDto(tmo.tmo_Id, tmo.tmo_Descripcion, tmo.tmo_Simbolo);
  }
}
