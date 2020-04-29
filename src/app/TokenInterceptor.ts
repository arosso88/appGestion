import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    localStorage.setItem('nombreServidor', 'VALEANDRES')
    localStorage.setItem('instanciaSQL', 'SISTEMAS')
    localStorage.setItem('bd', 'GestionStock')

    const nombreServidor = localStorage.getItem('nombreServidor');
    const instanciaSQL = localStorage.getItem('instanciaSQL');
    const bd = localStorage.getItem('bd')
    const token = localStorage.getItem('token');

    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        nombreServidor: nombreServidor,
        instanciaSQL: instanciaSQL,
        bd: bd,
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });

    return next.handle(request);
  }
}
