import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, ObservableLike } from 'rxjs';
import { SAUsuariosDto } from '../Dtos/SAUsuariosDto';
import { Router } from  '@angular/router';
import { MensajesService } from './mensajes.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _loginURL = 'https://localhost:44355/SAUsuarios';

  constructor(
    private _httpClient: HttpClient, private _router: Router, private _mensajesService: MensajesService
  ) { }

  Autenticar(usuario: string, clave: string): Observable<any> {
    localStorage.setItem('usuario', usuario)
    localStorage.setItem('clave', clave)

    const dto = new SAUsuariosDto(0, '', usuario, clave, '');
    return this._httpClient.post(this._loginURL, dto);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    const token= localStorage.getItem('token');
    return token;
  }

  limpiarToken() {
    localStorage.removeItem('token');
  }

  GetUsuario(): string {
    return localStorage.getItem('usuario');
  }

  IrALoginPorTokenInvalido() {
    if (this.getToken() == null) {
      this._mensajesService.openSnackBar("Token inválido", "Aceptar", 3000);
      this._router.navigate(['/login']);
    }
  }
}
