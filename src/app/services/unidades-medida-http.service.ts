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

  GetUme(dto: UnidadesMedidaDto): UnidadesMedida{
    return new UnidadesMedida(dto.ume_Id, dto.ume_Codigo, dto.ume_Descripcion);
  }

  GetUnidadesMedida(): UnidadesMedida[] {
      this.GetAll().subscribe(x => { this._unidadesMedida = x; })
      return this._unidadesMedida;
  }
}
