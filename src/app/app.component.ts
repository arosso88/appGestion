import { Component, ViewChild, HostListener  } from '@angular/core';
import { DataService } from  './services/data.service';
import { Router } from  '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  Session: string;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  opened = true;
  data: any[] = [];


  constructor(private _dataService: DataService,
    private _router: Router) {}

  ngOnInit() {
    console.log(window.innerWidth)
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }

    for (let i = 1; i <= 10; i++) {
      const item = { id: i, name: `Person ${i}`, email: `person${i}@gmail.com` };

      this.data.push(item);
    }
  }

  Ingresar() {
    this._router.navigate(['/principal']);
  }

  IrACEMRecNuevo() {

  }

  IrACEMRecibidos() {

  }

  IrAOVEListado(){
    this._router.navigate(['/ove']);
  }

  IrAOVENueva(){
    this._router.navigate(['/ove', 'agregar', 0]);
  }

  IrACEMEmitidos(){
    this._router.navigate(['/cemEmi']);
  }

  IrACEMEmiNuevo() {
    this._router.navigate(['/cemEmi', 'agregar', 0]);
  }

  IrAPrincipal() {
    this.Ingresar();
  }

  IrAArticulos(){
    this._router.navigate(['/articulos']);
  }

  IrACIA(){
    this._router.navigate(['/cia']);
  }

  IrAUME(){
    this._router.navigate(['/ume']);
  }

  IrATMO(){
    this._router.navigate(['/tmo']);
  }

  IrATNU() {
    this._router.navigate(['/tnu']);
  }

  IrATCO() {
    this._router.navigate(['/tco']);
  }

  IrAPDU() {
    this._router.navigate(['/productos']);
  }

  IrAPCH() {
    this._router.navigate(['/cosechas']);
  }

  IrAClientes(){
    this._router.navigate(['/clientes']);
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


  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55
      this.opened = true;
    }
  }
}
