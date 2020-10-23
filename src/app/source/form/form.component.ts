import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SourceService } from '../source.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  sourceForm: FormGroup;
  fields: FormArray;

  sourcetype: any[] = [
    { name: 'Databace', value: 'db' },
    { name: 'File', value: 'file' }
  ];
  dbtype: any[] = [
    { name: 'Mysql', value: 'sql' },
    { name: 'Oracle', value: 'oracle' }
  ];
  filetype: any[] = [
    { name: 'Excel', value: 'excel' },
    { name: 'Json', value: 'json' }
  ];
  fieldtype: any[] = [
    { name: 'string', value: 'string' },
    { name: 'char', value: 'char' },
    { name: 'number', value: 'number' },
    { name: 'text', value: 'text' },
    { name: 'date', value: 'date' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sourceService: SourceService,
    private location: Location,
    ) { }

  ngOnInit(): void {
    // console.log(this.route.snapshot.data.item);
    let data = this.route.snapshot.data.item;
    this.sourceForm = this.createForm(data);
  }

  createForm(data) {
    return this.formBuilder.group({
      _id: data._id,
      name: data.name,
      sourcetype: data.sourcetype,
      sourcedb: this.sourcedbForm(data),
      sourcefile: this.sourcefileForm(data),
      query: data.query,
      fields: this.formBuilder.array(this.fieldFormArray(data))
    })
  }

  sourcedbForm(data) {
    return this.formBuilder.group({
      dbtype: data.sourcedb.dbtype,
      host: data.sourcedb.host,
      username: data.sourcedb.username,
      password: data.sourcedb.password,
    })
  }

  sourcefileForm(data) {
    return this.formBuilder.group({
      filetype: data.sourcefile.filetype,
      filepath: data.sourcefile.filepath
    })
  }

  fieldFormArray(data): any[] {
    let fields = [];
    data.fields.forEach(field => {
      fields.push(
        this.formBuilder.group({
          fieldname: field.fieldname,
          fieldtype: field.fieldtype,
          fieldlength: field.fieldlength,
          defaultvalue: field.defaultvalue,
          example: field.example
        })
      )
    })
    return fields;
  }

  fieldFormControl() {
    let fields = (this.sourceForm.get("fields") as FormArray).controls;
    return fields;
  }

  addFieldItem(): void {
    this.fields = this.sourceForm.get('fields') as FormArray;
    this.fields.push(
      this.formBuilder.group({
        fieldname: "",
        fieldtype: "string",
        fieldlength: 0,
        defaultvalue: "",
        example: ""
      })
    );
  }

  deleteField(idy) {
    this.fields.removeAt(idy)
  }

  async onSaveData() {
    this.sourceService.saveData(this.sourceForm.value).then(res => {
      this.location.back();
    }).catch(err => {

    });
  }

}
