import { Component, ViewChild } from '@angular/core';
import { DataService } from  './services/data.service';
import { Router } from  '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  Session: string;

  constructor(private _dataService: DataService,
    private _router: Router) {}

  ngOnInit() {
  }

  Ingresar() {
    this._router.navigate(['/principal']);
  }

  IrAArticulos(){
    this._router.navigate(['/articulos']);
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
