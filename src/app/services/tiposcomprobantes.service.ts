import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, ObservableLike } from 'rxjs';
import { map } from 'rxjs/operators';
import { TiposComprobantes } from '../entities/TiposComprobantes';
import { TiposComprobantesDto } from  '../Dtos/TiposComprobantesDto';

@Injectable({
  providedIn: 'root'
})
export class TiposcomprobantesService {
  private _tcoURL = 'https://localhost:44355/TiposComprobantes';
  private _tco: TiposComprobantes[];

  constructor(private _httpClient: HttpClient) { }

  GetAll(): Observable<TiposComprobantes[]> {
    return this._httpClient
    .get<TiposComprobantesDto[]>(this._tcoURL)
    .pipe(
      map(dto => dto.map(tco => this.GetTCO(tco)))
    );
  }

  Get(id: number): Observable<TiposComprobantes> {
    return this._httpClient
      .get<TiposComprobantesDto>(this.GetUrlId(id))
      .pipe(
        map(x => this.GetTCO(x))
      );
  }

  Delete(id: number): Observable<void> {
    return this._httpClient.delete<void>(this.GetUrlId(id));
  }

  Update(tco: TiposComprobantes): Observable<void> {
    return this._httpClient.put<void>(this.GetUrlId(tco.tco_Id), this.GetDto(tco))
  }

  Add(tco: TiposComprobantes): Observable<void> {
    return this._httpClient.post<void>(this._tcoURL, this.GetDto(tco))
  }

  GetDto(tco: TiposComprobantes): TiposComprobantesDto {
    return new TiposComprobantesDto(tco.tco_Id,
      tco.tco_Codigo,
      tco.tco_Descripcion,
      tco.tco_Tipo,
      tco.tco_DebitoCreditoVdor,
      tco.tco_DebitoCreditoCdor,
      tco.tco_tnu_Id,
      tco.tco_EmitidoRecibido,
      '',
      tco.tco_MovimientoStock);
  }

  GetUrlId(id: number): string {
    return `${this._tcoURL}/${id}`;
  }

  GetTCO(dto: TiposComprobantesDto): TiposComprobantes{
    return new TiposComprobantes(dto.tco_Id,
      dto.tco_Codigo,
      dto.tco_Descripcion,
      dto.tco_Tipo,
      dto.tco_DebitoCreditoVdor,
      dto.tco_DebitoCreditoCdor,
      dto.tco_tnu_Id,
      dto.tco_EmitidoRecibido,
      dto.descripcionTNU,
      dto.tco_MovimientoStock);
  }

  GetTiposComprobantes(): TiposComprobantes[] {
    this.GetAll().subscribe(x => { this._tco = x; })
    return this._tco;
  }

  FiltrarPorCodigo(codigo: string): Observable<TiposComprobantes[]> {
    return this.GetAll()
      .pipe(
        map(x => x.filter(a => a.tco_Descripcion.toLowerCase().indexOf(codigo.toLowerCase()) >= 0))
      );
  }
}
