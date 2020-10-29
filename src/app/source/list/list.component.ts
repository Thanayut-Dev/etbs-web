import { BankService } from './../../bank/bank.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ListDataSource, ListItem } from './list-datasource';
import { ActivatedRoute } from '@angular/router';
import { SourceService } from '../source.service';
import { MatDialog } from '@angular/material/dialog';
import { TemplateComponent } from '../template-modal/template.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ListItem>;
  dataSource: ListDataSource;
  templateData: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'menu'];
  constructor(private route: ActivatedRoute,
    private sourceService: SourceService,
    public dialog: MatDialog,
    private bankService: BankService
  ) { }

  ngOnInit() {
    // console.log(this.route.snapshot.data.items.data);
    this.dataSource = new ListDataSource(this.route.snapshot.data.items.data);

    this.bankService.getDataList().subscribe((res: any) => {
      this.templateData = res.data;
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  deleteData(item) {
    this.sourceService.deleteData(item).then((res) => {
      this.sourceService.getDataList().subscribe((res: any) => {
        this.table.dataSource = res.data;
      })
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TemplateComponent, {
      width: '900px',
      height: '400px',
      data: this.templateData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }


}
