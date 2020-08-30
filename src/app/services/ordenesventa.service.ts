import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, ObservableLike } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrdenesVenta } from '../entities/OrdenesVenta';
import { OrdenesVentaDto } from  '../Dtos/OrdenesVentaDto';


@Injectable({
  providedIn: 'root'
})
export class OrdenesventaService {

  private _url = 'https://localhost:44355/OrdenesVenta';

  constructor(private _httpClient: HttpClient) { }

  GetAll(): Observable<OrdenesVenta[]> {
    return this._httpClient
      .get<OrdenesVentaDto[]>(this._url)
      .pipe(
        map(dto => dto.map(ove => this.GetOrdenVenta(ove)))
      );
  }

  GetOrdenVenta(dto: OrdenesVentaDto): OrdenesVenta {
    return new OrdenesVenta(dto.ove_Id,
      dto.ove_Codigo,
      dto.ove_cli_IdVendedor,
      dto.ove_cli_IdComprador,
      dto.ove_pdu_Id,
      dto.ove_pch_Id,
      dto.ove_Precio,
      dto.ove_tmo_IdPrecio,
      dto.ove_KgPactados,
      dto.ove_Observaciones,
      dto.ove_FechaNegocio,
      dto.nombreComprador,
      dto.nombreVendedor,
      dto.moneda);
  }

  Get(id: number): Observable<OrdenesVenta> {
    return this._httpClient
      .get<OrdenesVentaDto>(this.GetUrlId(id))
      .pipe(
        map(x => this.GetOrdenVenta(x))
      );
  }

  GetUrlId(id: number): string {
    return `${this._url}/${id}`;
  }

  Delete(id: number): Observable<void> {
    return this._httpClient.delete<void>(this.GetUrlId(id));
  }

  Update(ove: OrdenesVenta): Observable<void> {
    return this._httpClient.put<void>(this.GetUrlId(ove.ove_Id), this.GetDto(ove))
  }

  Add(ove: OrdenesVenta): Observable<void> {
    return this._httpClient.post<void>(this._url, this.GetDto(ove))
  }

  GetDto(ove: OrdenesVenta): OrdenesVentaDto {
    return new OrdenesVentaDto(ove.ove_Id,
      ove.ove_Codigo,
      ove.ove_cli_IdVendedor,
      ove.ove_cli_IdComprador,
      ove.ove_pdu_Id,
      ove.ove_pch_Id,
      ove.ove_Precio,
      ove.ove_tmo_IdPrecio,
      ove.ove_KgPactados,
      ove.ove_Observaciones,
      ove.ove_FechaNegocio,
      ove.nombreComprador,
      ove.nombreVendedor,
      ove.moneda);
  }

  FiltrarPorCodigo(codigo: string): Observable<OrdenesVenta[]> {
    return this.GetAll()
      .pipe(
        map(x => x.filter(a => a.ove_Codigo.toLowerCase().indexOf(codigo.toLowerCase()) >= 0))
      );
  }
}
