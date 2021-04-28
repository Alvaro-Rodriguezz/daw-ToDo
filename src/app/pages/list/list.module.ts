import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { MatSliderModule } from '@angular/material/slider';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    MatSliderModule
  ]
})
export class ListModule { }
