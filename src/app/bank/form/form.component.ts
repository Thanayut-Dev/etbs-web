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
  image: String = "https://image.freepik.com/free-photo/image-human-brain_99433-298.jpg";
  bankForm: FormGroup;
  rows: FormArray;
  fields: FormArray;
  panelOpenState = false;

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

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private bankService: BankService,
    private location: Location,
    ) { }
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
      encrypt: data.encrypt,
      upload: data.upload,
      limitamount: data.limitamount,
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
      fields.push(this.formBuilder.group({
        fieldname: field.fieldname,
        fieldtype: field.fieldtype,
        fieldlength: field.fieldlength,
        required: field.required,
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
            required: false,
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
        required: false,
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
    this.bankService.saveData(this.bankForm.value).then(res => {
      this.location.back();
    }).catch(err => {

    });
  }

  exampleFile() {
    this.bankService.exampleFile(this.bankForm.value).then((res: any) => {
      this.downLoadFile(res);
    })
  }

  downLoadFile(data: any) {
    // console.log(data);
    var url = 'data:text/csv;charset=utf-8,' + data;

    var downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "formatbank.txt";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  onFileChanged(event) {
    const file = event.target.files[0]
    this.bankForm.patchValue({
      image: file
    })
    this.bankForm.get("image").updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result as string;
    }
    reader.readAsDataURL(file);
  }
}
