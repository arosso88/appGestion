import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, ObservableLike } from 'rxjs';
import { map } from 'rxjs/operators';
import { UnidadesMedida } from '../entities/UnidadesMedida';
import { UnidadesMedidaDto } from  '../Dtos/UnidadesMedidaDto';

@Injectable({
  providedIn: 'root'
})
export class UnidadesMedidaHttpService {

  private _umeURL = 'https://localhost:44355/unidadesMedida';
  private _unidadesMedida: UnidadesMedida[];

  constructor(
    private _httpClient: HttpClient
  ) { }

  GetAll(): Observable<UnidadesMedida[]> {
    return this._httpClient
    .get<UnidadesMedidaDto[]>(this._umeURL)
    .pipe(
      map(dto => dto.map(ume => this.GetUme(ume)))
    );
  }

  Get(id: number): Observable<UnidadesMedida> {
    return this._httpClient
      .get<UnidadesMedidaDto>(this.GetUrlId(id))
      .pipe(
        map(x => this.GetUme(x))
      );
  }

  Delete(id: number): Observable<void> {
    return this._httpClient.delete<void>(this.GetUrlId(id));
  }

  Update(ume: UnidadesMedida): Observable<void> {
    return this._httpClient.put<void>(this.GetUrlId(ume.ume_Id), this.GetDto(ume))
  }

  Add(ume: UnidadesMedida): Observable<void> {
    return this._httpClient.post<void>(this._umeURL, this.GetDto(ume))
  }

  FiltrarPorCodigo(filtro: string): Observable<UnidadesMedida[]> {
    return this.GetAll()
      .pipe(
        map(x => x.filter(a => a.ume_Descripcion.toLowerCase().indexOf(filtro.toLowerCase()) >= 0))
      );
  }

  GetUrlId(id: number): string {
    return `${this._umeURL}/${id}`;
  }

  GetUme(dto: UnidadesMedidaDto): UnidadesMedida{
    return new UnidadesMedida(dto.ume_Id, dto.ume_Codigo, dto.ume_Descripcion);
  }

  GetUnidadesMedida(): UnidadesMedida[] {
      this.GetAll().subscribe(x => { this._unidadesMedida = x; })
      return this._unidadesMedida;
  }

  GetDto(ume: UnidadesMedida): UnidadesMedidaDto {
    return new UnidadesMedidaDto(ume.ume_Id, ume.ume_Codigo, ume.ume_Descripcion);
  }
}
