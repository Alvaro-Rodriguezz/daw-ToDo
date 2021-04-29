import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '',   pathMatch: 'full',  redirectTo: 'list' },
  { path: 'list', loadChildren: () => import('./pages/list/list.module').then(m => m.ListModule) },
  { path: 'add', loadChildren: () => import('./pages/add/add.module').then(m => m.AddModule) },
  { path: 'historical', loadChildren: () => import('./pages/historical/historical.module').then(m => m.HistoricalModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
