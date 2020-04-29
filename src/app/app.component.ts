import { Component } from '@angular/core';
import { DataService } from  './services/data.service';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //titulo: string;
  usuario: string;
  clave: string;

  constructor(private _dataService: DataService,
    private _router: Router) {}

  ngOnInit() {
    //this._dataService.TituloPrincipal$.subscribe(titulo => this.titulo = titulo);
  }

  Ingresar() {
    this._router.navigate(['/principal']);
  }
}
