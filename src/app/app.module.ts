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

@NgModule({
  declarations: [
    AppComponent,
    ArticulosListaComponent,
    ArticulosEdicionComponent,
    LoginComponent,
    PrincipalComponent,
    LoadingComponent,
    CiaListaComponent,
    CiaEdicionComponent
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
      { path: 'cia', component: CiaListaComponent },
      { path: 'cia/:operacion/:id', component: CiaEdicionComponent },
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
    DataService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
