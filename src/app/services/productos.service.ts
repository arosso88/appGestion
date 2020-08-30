import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, ObservableLike } from 'rxjs';
import { map } from 'rxjs/operators';
import { Productos } from '../entities/Productos';
import { ProductosDto } from  '../Dtos/ProductosDto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private _url = 'https://localhost:44355/Productos';

  constructor(private _httpClient: HttpClient) { }

  GetAll(): Observable<Productos[]> {
    return this._httpClient
      .get<ProductosDto[]>(this._url)
      .pipe(
        map(dto => dto.map(pdu => this.GetProducto(pdu)))
      );
  }

  GetProducto(dto: ProductosDto): Productos {
    return new Productos(dto.pdu_Id, dto.pdu_Descripcion);
  }

  Get(id: string): Observable<Productos> {
    return this._httpClient
      .get<ProductosDto>(this.GetUrlId(id))
      .pipe(
        map(x => this.GetProducto(x))
      );
  }

  GetUrlId(id: string): string {
    return `${this._url}/${id}`;
  }

  Delete(id: string): Observable<void> {
    return this._httpClient.delete<void>(this.GetUrlId(id));
  }

  Update(producto: Productos): Observable<void> {
    return this._httpClient.put<void>(this.GetUrlId(producto.pdu_Id), this.GetDto(producto))
  }

  Add(producto: Productos): Observable<void> {
    return this._httpClient.post<void>(this._url, this.GetDto(producto))
  }

  GetDto(producto: Productos): ProductosDto {
    return new ProductosDto(producto.pdu_Id, producto.pdu_Descripcion);
  }

  FiltrarPorDescripcion(descripcion: string): Observable<Productos[]> {
    return this.GetAll()
      .pipe(
        map(x => x.filter(a => a.pdu_Descripcion.toLowerCase().indexOf(descripcion.toLowerCase()) >= 0))
      );
  }
}
