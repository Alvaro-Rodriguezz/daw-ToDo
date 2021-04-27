import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricalRoutingModule } from './historical-routing.module';
import { HistoricalComponent } from './historical.component';


@NgModule({
  declarations: [HistoricalComponent],
  imports: [
    CommonModule,
    HistoricalRoutingModule
  ]
})
export class HistoricalModule { }
