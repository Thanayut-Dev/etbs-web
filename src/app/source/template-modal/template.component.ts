import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ListComponent } from 'src/app/bank/list/list.component';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  // @Input() data: any;

  // image: String = "https://play-lh.googleusercontent.com/ovSLL4E--Mo_nJg4XHE8k_9KYCpAbn6FB0FLMgzl6lyNubIJoJxdvWyEnM7sN02DD5I";

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<TemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ListComponent,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

  selectTemplate(item) {
    this.router.navigate(['dataset/form/new', { dataId: item }]);
    // console.log(item);
    // this.router.navigateByUrl('dataset/form/new');
    this.dialogRef.close();
  }

}
