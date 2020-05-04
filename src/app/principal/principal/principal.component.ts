import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { LoginService } from '../../services/login.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private _dataService: DataService,
    private _loginService: LoginService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this._loginService.IrALoginPorTokenInvalido();
    this.appComponent.Session = 'Cerrar Sesión ['+ this._loginService.GetUsuario() + ']';
  }

}
