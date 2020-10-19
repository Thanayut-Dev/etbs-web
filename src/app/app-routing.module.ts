import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'bank',
    loadChildren: () => import('./bank/bank.module').then(m => m.BankModule)
  },
  {
    path: 'source',
    loadChildren: () => import('./source/source.module').then(m => m.SourceModule)
  },
  {
    path: '**',
    redirectTo: 'bank'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
