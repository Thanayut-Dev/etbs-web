import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BankService } from '../bank.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  bankForm: FormGroup;
  rows: FormArray;
  fields: FormArray;

  fieldtype: any[] = [
    { name: 'string', value: 'string' },
    { name: 'char', value: 'char' },
    { name: 'number', value: 'number' },
    { name: 'text', value: 'text' },
    { name: 'date', value: 'date' }
  ];

  rowtype: any[] = [
    { name: 'Header', value: 'header' },
    { name: 'Product', value: 'product' },
    { name: 'Transection', value: 'transection' },
    { name: 'Footer', value: 'footer' }
  ];

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private bankService: BankService, private location: Location,) { }
  ngOnInit(): void {
    let data = this.route.snapshot.data.item;
    this.bankForm = this.createForm(data)
  }
  createForm(data): FormGroup {
    return this.formBuilder.group({
      _id: data._id,
      name: data.name,
      image: data.image,
      separatetype: data.separatetype,
      separatechar: data.separatechar,
      rows: this.formBuilder.array(this.createRows(data)),
      encryptcmd: data.encryptcmd,
      uploadcmd: data.uploadcmd,
      maxamount: data.maxamount
    })
  }
  createRows(data): any[] {
    let rows = [];
    data.rows.forEach(row => {
      rows.push(this.formBuilder.group({
        rowname: row.rowname,
        rowtype: row.rowtype,
        required: row.required,
        fields: this.createFields(row)
      }))
    })
    return rows;
  }
  createFields(row) {
    let fields = this.formBuilder.array([]);
    row.fields.forEach(field => {
      // console.log(field);
      fields.push(this.formBuilder.group({
        fieldname: field.fieldname,
        fieldtype: field.fieldtype,
        fieldlength: field.fieldlength,
        defaultvalue: field.defaultvalue,
        example: field.example
      }))
    })
    return fields;
  }

  getFormRows() {
    let rows = (this.bankForm.get("rows") as FormArray).controls;
    return rows;
  }

  getFormFields(row) {
    let fields = (row.get("fields") as FormArray).controls;
    return fields;
  }


  addNewRow() {
    this.rows = this.bankForm.get("rows") as FormArray;
    this.rows.push(
      this.formBuilder.group({
        rowname: "",
        rowtype: "",
        required: false,
        fields: this.formBuilder.array([
          this.formBuilder.group({
            fieldname: "",
            fieldtype: "string",
            fieldlength: 0,
            defaultvalue: "",
            example: ""
          })
        ])
      })
    )
  }
  addNewField(row) {
    this.fields = row.get("fields") as FormArray;
    this.fields.push(
      this.formBuilder.group({
        fieldname: "",
        fieldtype: "string",
        fieldlength: 0,
        defaultvalue: "",
        example: ""
      })
    )
  }

  deleteRow(idx) {
    this.rows.removeAt(idx)
  }
  deleteField(row, idy) {
    let fields = row.get("fields") as FormArray;
    fields.removeAt(idy);
  }


  async onSaveData() {
    // console.log(this.bankForm.value);
    this.bankService.saveData(this.bankForm.value).then(res => {
      this.location.back();
    }).catch(err => {

    });
  }

}
