import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricalRoutingModule } from './historical-routing.module';
import { HistoricalComponent } from './historical.component';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [HistoricalComponent],
  imports: [
    CommonModule,
    HistoricalRoutingModule,
    MatCardModule
  ]
})
export class HistoricalModule { }
