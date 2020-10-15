import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  bankForm: FormGroup;
  separatetype: any[] = [
    { name: 'Fix Length', value: 'false' },
    { name: 'SeparateChar', value: 'turn' },
  ]
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) { }
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

    })
  }

}
