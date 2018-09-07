import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ArchiviListComponent } from './archivi/archivi-list/archivi-list.component';
import { PosizioniListComponent } from './posizioni/posizioni-list/posizioni-list.component';
import { PosizioneItemComponent } from './posizioni/posizioni-list//posizione-item/posizione-item.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { AcquistiListComponent } from './acquisti/acquisti-list/acquisti-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ArchiviUtentiComponent } from './archivi/archivi-utenti/archivi-utenti.component';
import { AcquistiMapComponent } from './acquisti/acquisti-map/acquisti-map.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ArchiviListComponent,
    PosizioniListComponent,
    PosizioneItemComponent,
    SignupComponent,
    SigninComponent,
    AcquistiListComponent,
    PageNotFoundComponent,
    ArchiviUtentiComponent,
    AcquistiMapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
