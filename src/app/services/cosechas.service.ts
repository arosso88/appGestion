import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, ObservableLike } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cosechas } from '../entities/Cosechas';
import { CosechasDto } from  '../Dtos/CosechasDto';

@Injectable({
  providedIn: 'root'
})
export class CosechasService {

  private _url = 'https://localhost:44355/Cosechas';

  constructor(private _httpClient: HttpClient) { }

  GetAll(): Observable<Cosechas[]> {
    return this._httpClient
      .get<CosechasDto[]>(this._url)
      .pipe(
        map(dto => dto.map(pch => this.GetCosecha(pch)))
      );
  }

  GetCosecha(dto: CosechasDto): Cosechas {
    return new Cosechas(dto.pch_Id, dto.pch_Descripcion);
  }

  Get(id: string): Observable<Cosechas> {
    return this._httpClient
      .get<CosechasDto>(this.GetUrlId(id))
      .pipe(
        map(x => this.GetCosecha(x))
      );
  }

  GetUrlId(id: string): string {
    return `${this._url}/${id}`;
  }

  Delete(id: string): Observable<void> {
    return this._httpClient.delete<void>(this.GetUrlId(id));
  }

  Update(cosecha: Cosechas): Observable<void> {
    return this._httpClient.put<void>(this.GetUrlId(cosecha.pch_Id), this.GetDto(cosecha))
  }

  Add(cosecha: Cosechas): Observable<void> {
    return this._httpClient.post<void>(this._url, this.GetDto(cosecha))
  }

  GetDto(cosecha: Cosechas): CosechasDto {
    return new CosechasDto(cosecha.pch_Id, cosecha.pch_Descripcion);
  }

  FiltrarPorDescripcion(descripcion: string): Observable<Cosechas[]> {
    return this.GetAll()
      .pipe(
        map(x => x.filter(a => a.pch_Descripcion.toLowerCase().indexOf(descripcion.toLowerCase()) >= 0))
      );
  }
}
