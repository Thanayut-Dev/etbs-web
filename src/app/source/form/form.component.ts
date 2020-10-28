import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SourceService } from '../source.service';
import { Location } from '@angular/common';
import { BankService } from '../../bank/bank.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  sourceForm: FormGroup;
  rows: FormArray;
  fields: FormArray;
  sourceData: any;

  // sourcetype: any[] = [
  //   { name: 'Databace', value: 'db' },
  //   { name: 'File', value: 'file' }
  // ];
  // dbtype: any[] = [
  //   { name: 'Mysql', value: 'sql' },
  //   { name: 'Oracle', value: 'oracle' }
  // ];
  // filetype: any[] = [
  //   { name: 'Excel', value: 'excel' },
  //   { name: 'Json', value: 'json' }
  // ];
  // fieldtype: any[] = [
  //   { name: 'string', value: 'string' },
  //   { name: 'char', value: 'char' },
  //   { name: 'number', value: 'number' },
  //   { name: 'text', value: 'text' },
  //   { name: 'date', value: 'date' }
  // ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sourceService: SourceService,
    private location: Location,
    private bankService: BankService
  ) { }

  ngOnInit(): void {

    if (this.route.snapshot.params.id === 'new') {
      let id = this.route.snapshot.params.dataId;
      this.bankService.getDataById(id).then(async (res: any) => {
        this.sourceData = res.rows;
        this.sourceForm = await this.createForm(res);
      })
    } else {
      let data = this.route.snapshot.data.item;
      this.sourceData = data.rows;
      this.sourceForm = this.createFormEdit(data);
    }
    // ของเก่า
    // let data = this.route.snapshot.data.item;
    // this.sourceForm = this.createForm(data);
  }



  // createForm //

  createForm(data): FormGroup {
    return this.formBuilder.group({
      _id: null,
      name: data.name,
      template: this.templateForm(data),
      datasource: this.datasourceForm(data),
      rows: this.formBuilder.array(this.createRows(data)),
      encrypt: data.encrypt,
      upload: data.upload,
      limitamount: data.limitamount,
      encryptcmd: data.encryptcmd,
      uploadcmd: data.uploadcmd,
      maxamount: data.maxamount
    })
  }

  templateForm(data) {
    return this.formBuilder.group({
      _id: null,
      name: data.name,
      separatetype: data.separatetype,
      separatechar: data.separatechar
    })
  }

  datasourceForm(data) {
    return this.formBuilder.group({
      driver: null,
      host: null,
      database: null,
      username: null,
      password: null
    })
  }

  createRows(data): any[] {
    let rows = [];
    data.rows.forEach(row => {
      rows.push(this.formBuilder.group({
        name: row.rowname,
        rowtype: row.rowtype,
        required: row.required,
        groupby: null,
        fields: this.createFields(row)
      }))
    })
    return rows;
  }

  createFields(row) {
    let fields = this.formBuilder.array([]);
    row.fields.forEach(field => {
      fields.push(this.formBuilder.group({
        name: field.fieldname,
        fieldtype: field.fieldtype,
        length: field.fieldlength,
        datafieldname: null,
        required: field.required,
        sum: null,
        count: null,
        formula: null
      }))
    })
    return fields;
  }





  // createFormEdit //

  createFormEdit(data): FormGroup {
    return this.formBuilder.group({
      _id: data._id,
      name: data.name,
      template: this.templateFormEdit(data),
      datasource: this.datasourceFormEdit(data),
      rows: this.formBuilder.array(this.createRowsEdit(data)),
      encrypt: data.encrypt,
      upload: data.upload,
      limitamount: data.limitamount,
      encryptcmd: data.encryptcmd,
      uploadcmd: data.uploadcmd,
      maxamount: data.maxamount
    })
  }

  templateFormEdit(data) {
    return this.formBuilder.group({
      _id: data.template._id,
      name: data.template.name,
      separatetype: data.template.separatetype,
      separatechar: data.template.separatechar
    })
  }

  datasourceFormEdit(data) {
    return this.formBuilder.group({
      driver: data.datasource.driver,
      host: data.datasource.host,
      database: data.datasource.database,
      username: data.datasource.username,
      password: data.datasource.password
    })
  }

  createRowsEdit(data): any[] {
    let rows = [];
    data.rows.forEach(row => {
      rows.push(this.formBuilder.group({
        name: row.name,
        rowtype: row.rowtype,
        required: row.required,
        groupby: row.groupby,
        fields: this.createFieldsEdit(row)
      }))
    })
    return rows;
  }

  createFieldsEdit(row) {
    let fields = this.formBuilder.array([]);
    row.fields.forEach(field => {
      fields.push(this.formBuilder.group({
        name: field.name,
        fieldtype: field.fieldtype,
        length: field.length,
        datafieldname: field.datafieldname,
        required: field.required,
        sum: field.sum,
        count: field.count,
        formula: field.formula
      }))
    })
    return fields;
  }


  getFormRows() {
    let rows = (this.sourceForm.get("rows") as FormArray).controls;
    return rows;
  }

  getFormFields(row) {
    let fields = (row.get("fields") as FormArray).controls;
    return fields;
  }

  async onSaveData() {
    this.sourceService.saveData(this.sourceForm.value).then(res => {
      this.location.back();
    }).catch(err => {

    });
  }

}
