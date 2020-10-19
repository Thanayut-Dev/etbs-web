import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SourceService } from './source.service';

const routes: Routes = [
  // {
  //   path: 'form/:id',
  //   component: FormComponent,
  //   resolve: { item: BankService }
  // },
  {
    path: '**',
    component: ListComponent,
    resolve: { items: SourceService }
  }
];

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ]
})
export class SourceModule { }
