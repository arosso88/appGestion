import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, ObservableLike } from 'rxjs';
import { map } from 'rxjs/operators';
import { Clientes } from '../entities/Clientes';
import { ClientesDto } from  '../Dtos/ClientesDto';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private _clientesURL = 'https://localhost:44355/Clientes';
  private _clientes: Clientes[];

  constructor(private _httpClient: HttpClient) { }

  GetAll(): Observable<Clientes[]> {
    return this._httpClient
    .get<ClientesDto[]>(this._clientesURL)
    .pipe(
      map(dto => dto.map(cli => this.GetCliente(cli)))
    );
  }

  Get(id: number): Observable<Clientes> {
    return this._httpClient
      .get<ClientesDto>(this.GetUrlId(id))
      .pipe(
        map(x => this.GetCliente(x))
      );
  }

  Delete(id: number): Observable<void> {
    return this._httpClient.delete<void>(this.GetUrlId(id));
  }

  Update(cli: Clientes): Observable<void> {
    return this._httpClient.put<void>(this.GetUrlId(cli.cli_Id), this.GetDto(cli))
  }

  Add(cli: Clientes): Observable<void> {
    return this._httpClient.post<void>(this._clientesURL, this.GetDto(cli))
  }

  GetDto(cli: Clientes): ClientesDto {
    return new ClientesDto(cli.cli_Id, cli.cli_clc_Codigo, cli.cli_Nombre, cli.cli_Apellido, cli.cli_Direccion);
  }

  GetUrlId(id: number): string {
    return `${this._clientesURL}/${id}`;
  }

  GetCliente(dto: ClientesDto): Clientes{
    return new Clientes(dto.cli_Id, dto.cli_clc_Codigo, dto.cli_Nombre, dto.cli_Apellido, dto.cli_Direccion);
  }


  FiltrarPorCodigo(filtro: string): Observable<Clientes[]> {
    return this.GetAll()
      .pipe(
        map(x => x.filter(a => a.cli_Apellido.toLowerCase().indexOf(filtro.toLowerCase()) >= 0))
      );
  }
}
