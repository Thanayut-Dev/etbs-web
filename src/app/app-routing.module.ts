import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'template',
    loadChildren: () => import('./bank/bank.module').then(m => m.BankModule)
  },
  {
    path: 'dataset',
    loadChildren: () => import('./source/source.module').then(m => m.SourceModule)
  },
  {
    path: '**',
    redirectTo: 'template'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
