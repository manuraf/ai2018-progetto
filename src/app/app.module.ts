import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import { HeaderComponent } from './header/header.component';
import { ArchiviListComponent } from './archivi/archivi-list/archivi-list.component';
import { PosizioniListComponent } from './posizioni/posizioni-list/posizioni-list.component';
import { PosizioneItemComponent } from './posizioni/posizioni-list//posizione-item/posizione-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    HeaderComponent,
    ArchiviListComponent,
    PosizioniListComponent,
    PosizioneItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
