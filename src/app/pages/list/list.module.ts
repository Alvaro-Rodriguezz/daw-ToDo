import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
// import {MatSort} from '@angular/material/sort';
// import {MatTableDataSource} from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
// import {MatPaginator} from '@angular/material/paginator';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    MatSliderModule,
    MatCardModule,
    MatButtonToggleModule,
    // MatSort,
    // MatTableDataSource,
    MatTableModule,
    // MatPaginator
  ]
})
export class ListModule { }
