import { Component, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Comprobantes } from '../../../entities/Comprobantes';
import { Router, ActivatedRoute } from  '@angular/router';
import { DataService } from '../../../services/data.service';
import { LoginService } from '../../../services/login.service';
import { ComprobantesService } from '../../../services/comprobantes.service';
import { TiposcomprobantesService } from '../../../services/tiposcomprobantes.service';
import { TiposComprobantes } from '../../../entities/TiposComprobantes';
import { Clientes } from '../../../entities/Clientes';
import { ClientesService } from '../../../services/clientes.service';
import { Articulos } from '../../../entities/Articulos';
import { ArticulosHttpService } from '../../../services/articulos-http.service';
import { FormControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GrillaArticulosDto } from  '../../../Dtos/GrillaArticulosDto';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cem-emi-edicion',
  templateUrl: './cem-emi-edicion.component.html',
  styleUrls: ['./cem-emi-edicion.component.css']
})
export class CemEmiEdicionComponent implements OnInit {

  cemSeleccionado: Comprobantes;
  titulo: string;
  tiposComprobantes: TiposComprobantes[];
  clientes: Clientes[];
  articulos: Articulos[];
  articuloSeleccionado: Articulos;

  public articulosControl: FormControl = new FormControl();
  public articulosFilterControl: FormControl = new FormControl();

  public articulosFiltrados: ReplaySubject<Articulos[]> = new ReplaySubject<Articulos[]>(1);
  @ViewChild('singleSelect') singleSelect: MatSelect;
  private _onDestroy = new Subject<void>();

  dataSource: MatTableDataSource<GrillaArticulosDto>;
  displayedColumns = ['IdArticulo', 'Nombre' ,'Cantidad', 'Precio', 'Importe'];
  grillaArticulos: GrillaArticulosDto[];

  constructor(private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _dataService: DataService,
    private _loginService: LoginService,
    private _cemService: ComprobantesService,
    private _tcoService: TiposcomprobantesService,
    private _clienteService: ClientesService,
    private _articulosService: ArticulosHttpService) {
     }

  ngOnInit(): void {
    this._loginService.IrALoginPorTokenInvalido();

    this.CargarClientes();
    this.CargarTiposComprobantes();
    this.CargarArticulos();

    const id = Number(this._activeRoute.snapshot.paramMap.get('id'));
    const operacion = this._activeRoute.snapshot.paramMap.get("operacion");

    if (operacion === "agregar") {
      this.cemSeleccionado = new Comprobantes(0,0,0,0,new Date(),0,0,0,0,'',0,'',0,'','',0,0,'');
      this.titulo = "Nuevo Comprobante Emitido";
    }
    else {
      this._cemService.Get(id).subscribe(cem => this.cemSeleccionado = cem);
      this.titulo = "Editar Comprobante Emitido";
    }

    this.articulosControl.setValue(this.articulos);
    //this.filteredBanks.next(this.articulos.slice());

    this.articulosFilterControl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.FiltrarArticulos();
    });

    this.dataSource = new MatTableDataSource(this.grillaArticulos);
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private FiltrarArticulos() {
    if (!this.articulos) {
      return;
    }

    let search = this.articulosFilterControl.value;
    if (!search) {
      this.articulosFiltrados.next(this.articulos.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.articulosFiltrados.next(
      this.articulos.filter(art => art.art_Codigo.toLowerCase().indexOf(search) > -1)
    );
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  private setInitialValue() {
    this.articulosFiltrados
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: Articulos, b: Articulos) => a.art_Id === b.art_Id;
      });
    }


  CargarTiposComprobantes() {
    this._tcoService.GetAll('E').subscribe(tcos => { this.tiposComprobantes = tcos; })
  }

  CargarClientes(){
    this._clienteService.GetAll().subscribe(clientes => { this.clientes = clientes; });
  }

  CargarArticulos(){
    this._articulosService.GetAll().subscribe(articulos => { this.articulos = articulos; });
  }

  CargarTnu(tco: TiposComprobantes){

  }

  Regresar() {
    this._router.navigate(['/cemEmi']);
  }

  Guardar(form: any) {

  }

  Filtrar(filtro: string) {

  }

  AgregarArticulo(form: any) {
    Object.keys(form).forEach((key, index) => this.articuloSeleccionado = form[key]);

    const articulo = new GrillaArticulosDto(this.articuloSeleccionado.art_Id,
      this.articuloSeleccionado.art_Descripcion, 0, 0, 0);

    if (!this.grillaArticulos) {
      const grilla: GrillaArticulosDto[] = [ articulo ];
      this.grillaArticulos = grilla;
    }
    else {
      this.grillaArticulos.push(articulo);
    }

    this.dataSource = new MatTableDataSource(this.grillaArticulos);
  }
}
