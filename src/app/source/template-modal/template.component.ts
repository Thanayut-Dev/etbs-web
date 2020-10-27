import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  constructor(private router: Router, public dialogRef: MatDialogRef<TemplateComponent>) { }

  ngOnInit(): void {
  }

  selectTemplate() {
    this.router.navigateByUrl('dataset/form/new');
    this.dialogRef.close();
  }

}
