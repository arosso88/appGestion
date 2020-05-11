import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, RouteConfigLoadEnd, ROUTES } from  '@angular/router';
import { AppComponent } from './app.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ArticulosHttpService } from './services/articulos-http.service';
import { UnidadesMedidaHttpService } from './services/unidades-medida-http.service';
import { DataService } from  './services/data.service';
import { ArticulosListaComponent } from './articulos/lista/articulos-lista/articulos-lista.component';
import { TokenInterceptor } from './TokenInterceptor';
import { ArticulosEdicionComponent } from './articulos/edicion/articulos-edicion/articulos-edicion.component';
import { LoginComponent } from './login/login/login.component';
import { PrincipalComponent } from './principal/principal/principal.component';
import { LoginService } from './services/login.service';
import { MensajesService } from './services/mensajes.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoadingComponent } from './loading/loading/loading.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CatIvaArtService } from './services/cat-iva-art.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { CiaListaComponent } from './cativaarticulo/lista/cia-lista/cia-lista.component';
import { CiaEdicionComponent } from './cativaarticulo/edicion/cia-edicion/cia-edicion.component';
import { UmelistaComponent } from './unidadesmedida/lista/umelista/umelista.component';
import { UmeedicionComponent } from './unidadesmedida/edicion/umeedicion/umeedicion.component';
import { TiposmonedaslistaComponent } from './tiposmonedas/lista/tiposmonedaslista/tiposmonedaslista.component';
import { TiposmonedasedicionComponent } from './tiposMonedas/edicion/tiposmonedasedicion/tiposmonedasedicion.component';
import { ClientesListaComponent } from './clientes/lista/clientes-lista/clientes-lista.component';
import { ClientesEdicionComponent } from './clientes/edicion/clientes-edicion/clientes-edicion.component';
import { TmoService } from './services/tmo.service';
import { ClientesService } from './services/clientes.service';

@NgModule({
  declarations: [
    AppComponent,
    ArticulosListaComponent,
    ArticulosEdicionComponent,
    LoginComponent,
    PrincipalComponent,
    LoadingComponent,
    CiaListaComponent,
    CiaEdicionComponent,
    UmelistaComponent,
    UmeedicionComponent,
    TiposmonedaslistaComponent,
    TiposmonedasedicionComponent,
    ClientesListaComponent,
    ClientesEdicionComponent
  ],
  imports: [
    BrowserModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    BrowserAnimationsModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatTableModule,
    MatMenuModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'articulos', component: ArticulosListaComponent },
      { path: 'articulos/:operacion/:id', component: ArticulosEdicionComponent },
      { path: 'tmo', component: TiposmonedaslistaComponent },
      { path: 'tmo/:operacion/:id', component: TiposmonedasedicionComponent },
      { path: 'clientes', component: ClientesListaComponent },
      { path: 'clientes/:operacion/:id', component: ClientesEdicionComponent },
      { path: 'cia', component: CiaListaComponent },
      { path: 'cia/:operacion/:id', component: CiaEdicionComponent },
      { path: 'ume', component: UmelistaComponent },
      { path: 'ume/:operacion/:id', component: UmeedicionComponent },
      { path: 'principal', component: PrincipalComponent },
      { path: 'login', component: LoginComponent },
      { path: '',   redirectTo: 'login', pathMatch: 'full' }
    ]),
  ],
  providers: [
    ArticulosHttpService,
    UnidadesMedidaHttpService,
    LoginService,
    MensajesService,
    CatIvaArtService,
    TmoService,
    ClientesService,
    DataService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
