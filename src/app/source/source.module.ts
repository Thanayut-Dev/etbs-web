import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SourceService } from './source.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { FormComponent } from './form/form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplateComponent } from './template-modal/template.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  {
    path: 'form/:id',
    component: FormComponent,
    resolve: { item: SourceService }
  },
  {
    path: '**',
    component: ListComponent,
    resolve: { items: SourceService }
  }
];

@NgModule({
  declarations: [ListComponent, FormComponent, TemplateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FlexLayoutModule,
    MatTabsModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class SourceModule { }
