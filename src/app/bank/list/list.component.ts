import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ListDataSource, ListItem } from './list-datasource';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { BankService } from '../bank.service';

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

  constructor(private route: ActivatedRoute, private router: Router, private bankService: BankService) { }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'menu'];

  ngOnInit() {
    // console.log(this.route.snapshot.data.item.data);
    this.dataSource = new ListDataSource(this.route.snapshot.data.items.data);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  deleteData(item) {
    this.bankService.deleteData(item).then((res) => {
      this.bankService.getDataList().subscribe((res: any) => {
        this.table.dataSource = res.data;
      })
    })
  }
}
