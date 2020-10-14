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

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) { }
  ngOnInit(): void {
    console.log(this.route.snapshot.data);
    this.bankForm = this.createForm()
  }
  createForm(): FormGroup {
    return this.formBuilder.group({
      _id: 1,
      name: 'dddd',
      // image: '',
      // separatetype: false,
      // separatechar: '',
    })
  }

}
