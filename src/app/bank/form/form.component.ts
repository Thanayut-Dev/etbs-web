import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BankService } from '../bank.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  bankForm: FormGroup;
  rows: FormArray;
  fields: FormArray;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private bankService: BankService) { }
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
      rows: this.formBuilder.array(this.createRows(data))
    })
  }
  createRows(data): any[] {
    let rows = [];
    data.rows.forEach(row => {
      rows.push(this.formBuilder.group({
        fields: this.createFields(row)
      }))
    })
    return rows;
  }
  createFields(row) {
    let fields = this.formBuilder.array([]);
    row.fields.forEach(field => {
      console.log(field);
      fields.push(this.formBuilder.group({
        fieldname: field.fieldname,
        fieldtype: field.fieldtype,
        fieldlength: field.fieldlength,
        defaultvalue: field.defaultvalue,
        example: field.exampleÎ
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


  addNewField(row) {

  }

  addNewRow() {

  }

}
