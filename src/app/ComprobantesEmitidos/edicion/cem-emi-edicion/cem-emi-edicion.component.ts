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
import { TiposMonedas } from '../../../entities/TiposMonedas';
import { TmoService } from '../../../services/tmo.service';
import { NuevoCEMDto } from '../../../Dtos/NuevoCEMDto';
import { DetalleCEMDto } from  '../../../Dtos/DetalleCEMDto';
import { DetalleComprobantesDto } from 'src/app/Dtos/DetalleComprobantesDto';
import { ComprobantesDto } from 'src/app/Dtos/ComprobantesDto';

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
  tiposMonedas: TiposMonedas[];

  public articulosControl: FormControl = new FormControl();
  public articulosFilterControl: FormControl = new FormControl();

  public articulosFiltrados: ReplaySubject<Articulos[]> = new ReplaySubject<Articulos[]>(1);
  @ViewChild('singleSelect') singleSelect: MatSelect;
  private _onDestroy = new Subject<void>();

  dataSource: MatTableDataSource<GrillaArticulosDto>;
  displayedColumns = ['IdArticulo', 'Nombre' ,'Cantidad', 'Precio', 'Importe', 'acciones'];
  grillaArticulos: GrillaArticulosDto[];

  subtotal: number;
  iva: number;
  total: number;

  constructor(private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _dataService: DataService,
    private _loginService: LoginService,
    private _cemService: ComprobantesService,
    private _tcoService: TiposcomprobantesService,
    private _clienteService: ClientesService,
    private _articulosService: ArticulosHttpService,
    private _tmoService: TmoService) {
     }

  ngOnInit(): void {
    this._loginService.IrALoginPorTokenInvalido();

    this.CargarClientes();
    this.CargarTiposComprobantes();
    this.CargarArticulos();
    this.CargarTiposMonedas();

    const id = Number(this._activeRoute.snapshot.paramMap.get('id'));
    const operacion = this._activeRoute.snapshot.paramMap.get("operacion");

    if (operacion === "agregar") {
      this.cemSeleccionado = new Comprobantes(0,0,0,0,new Date(),0,0,0,0,'',0,'',0,'','',0,0,'', '');
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

    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;
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

  CargarTiposMonedas(){
    this._tmoService.GetAll().subscribe(tmos => { this.tiposMonedas = tmos; })
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
    Object.keys(form).forEach((key, index) => this.cemSeleccionado[key] = form[key]);

    var detalles = new Array<DetalleComprobantesDto>();

    this.grillaArticulos.forEach((articulo, index) => {
      var det = new DetalleComprobantesDto(0
        , 0
        , articulo.IdArticulo
        , articulo.Nombre
        , Number(articulo.Cantidad)
        , Number(articulo.Precio)
        , Number(articulo.Importe)
        , this.cemSeleccionado.cem_tmo_Id
        , 0
        , 0);

        detalles.push(det);
    });

    var cemDto = new ComprobantesDto(0
      , this.cemSeleccionado.cem_tco_Id
      , 0
      , this.cemSeleccionado.cem_cli_IdComprador
      , this.cemSeleccionado.cem_FechaEmision
      , 0
      , 0
      , 0
      , this.cemSeleccionado.cem_tmo_Id
      , ''
      , 0
      , ''
      , 0
      , ''
      , ''
      , this.cemSeleccionado.cem_NroPuntoVenta
      , this.cemSeleccionado.cem_NroComprobante
      , this.cemSeleccionado.cem_Letra
      , detalles);

      this._cemService.Add(cemDto).subscribe();
      this.Regresar();
  }

  Filtrar(filtro: string) {

  }

  AgregarArticulo(form: any) {
    Object.keys(form).forEach((key, index) => this.articuloSeleccionado = form[key]);

    const articulo = new GrillaArticulosDto(this.articuloSeleccionado.art_Id,
      this.articuloSeleccionado.art_Descripcion, 0, 0, 0, '', this.articuloSeleccionado.porcentajeIva);

    if (!this.grillaArticulos) {
      const grilla: GrillaArticulosDto[] = [ articulo ];
      this.grillaArticulos = grilla;
    }
    else {
      this.grillaArticulos.push(articulo);
    }

    this.dataSource = new MatTableDataSource(this.grillaArticulos);
  }

  EliminarArticulo(articulo: GrillaArticulosDto) {
    const index = this.grillaArticulos.findIndex(a => a.IdArticulo === articulo.IdArticulo);
    this.grillaArticulos.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.grillaArticulos);
    this.CalcularTotales();
  }

  CambioPrecio(articulo: GrillaArticulosDto, precio: number) {
    articulo.Precio = precio;
    this.CalculoImporte(articulo);
  }

  CambioCantidad(articulo: GrillaArticulosDto, cantidad: number) {
    articulo.Cantidad = cantidad;
    this.CalculoImporte(articulo);
  }

  CalculoImporte(articulo: GrillaArticulosDto) {
    articulo.Importe = articulo.Precio * articulo.Cantidad;
    this.CalcularTotales();
  }

  CalcularTotales() {
    var subt = 0;
    var iv = 0;

    this.grillaArticulos.forEach((articulo, index) => {

      if (articulo.Importe != 0)
      {
        subt = subt + articulo.Importe;
        iv = iv + (articulo.Importe * (articulo.PorcentajeIva/100))
      }
    });

    this.subtotal = subt;
    this.iva = iv;
    this.total = subt + iv;
  }
}
