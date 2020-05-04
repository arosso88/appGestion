import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MensajesService} from '../../services/mensajes.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string;
  clave: string;

  constructor(private loginService: LoginService,
    private _router: Router, private _mensajesService: MensajesService,
    private _appComponent: AppComponent
  ) {}

  ngOnInit(): void {
    this.loginService.limpiarToken();
    this._appComponent.Session = "Iniciar Sesión"
  }

  Ingresar() {
    this.loginService.Autenticar(this.usuario, this.clave)
    .subscribe(data => {
      this.loginService.setToken(data.token);
      this._router.navigate(['/principal']);
    },
    error => {
      this._mensajesService.openSnackBar("Credenciales inválidas", "Aceptar", 3000);
    });
  }

}
