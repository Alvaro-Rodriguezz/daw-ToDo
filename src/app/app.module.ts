import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './pages/list/list.component';
import { AddComponent } from './pages/add/add.component';
import { HistoricalComponent } from './pages/historical/historical.component';
import { AngularFireModule} from '@angular/fire';
import {AngularFirestore} from '@angular/fire/firestore'
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddComponent,
    HistoricalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
