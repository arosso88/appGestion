import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(mensaje: string, accion: string, duracion) {
    this._snackBar.open(mensaje, accion, {
      duration: duracion,
    });
  }
}
