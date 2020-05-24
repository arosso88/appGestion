import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, pipe, ObservableLike } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comprobantes } from '../entities/Comprobantes';
import { ComprobantesDto } from  '../Dtos/ComprobantesDto';

@Injectable({
  providedIn: 'root'
})
export class ComprobantesService {

  private _cemURL = 'https://localhost:44355/ComprobantesEmitidos';

  constructor(
    private _httpClient: HttpClient
  ) { }

  GetAll(emitidoRecibido: string): Observable<Comprobantes[]> {
    let params = new HttpParams();
    params = params.append('emitidoRecibido', emitidoRecibido);

    return this._httpClient
      .get<ComprobantesDto[]>(this._cemURL, { params })
      .pipe(
        map(dto => dto.map(cemDto => this.GetComprobante(cemDto)))
      );
  }

  GetComprobante(cemDto: ComprobantesDto): Comprobantes {
    return new Comprobantes(cemDto.cem_Id,
      cemDto.cem_tco_Id,
      cemDto.cem_cli_IdVendedor,
      cemDto.cem_cli_IdComprador,
      cemDto.cem_FechaEmision,
      cemDto.cem_ImporteSubtotal,
      cemDto.cem_ImporteIva,
      cemDto.cem_ImporteTotal,
      cemDto.cem_tmo_Id,
      cemDto.TcoCodigo,
      cemDto.CodigoComprador,
      cemDto.NombreComprador,
      cemDto.CodigoVendedor,
      cemDto.NombreVendedor,
      cemDto.SimboloMoneda,
      cemDto.cem_NroPuntoVenta,
      cemDto.cem_NroComprobante,
      cemDto.cem_Letra);
  }

  Delete(id: number): Observable<void> {
    return this._httpClient.delete<void>(this.GetUrlId(id));
  }

  FiltrarPorComprador(filtro: string, emitidoRecibido: string): Observable<Comprobantes[]> {
    return this.GetAll(emitidoRecibido)
      .pipe(
        map(x => x.filter(c => c.NombreComprador.toLowerCase().indexOf(filtro.toLowerCase()) >= 0))
      );
  }

  GetUrlId(id: number): string {
    return `${this._cemURL}/${id}`;
  }
}
