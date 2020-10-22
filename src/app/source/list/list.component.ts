import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ListDataSource, ListItem } from './list-datasource';
import { ActivatedRoute } from '@angular/router';
import { SourceService } from '../source.service';

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

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'menu'];
  constructor(private route: ActivatedRoute, private sourceService: SourceService) { }

  ngOnInit() {
    // console.log(this.route.snapshot.data.items.data);
    this.dataSource = new ListDataSource(this.route.snapshot.data.items.data);
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
}
