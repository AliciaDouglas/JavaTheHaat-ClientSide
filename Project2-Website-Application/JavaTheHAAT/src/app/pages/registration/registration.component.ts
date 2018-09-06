import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    isLinear = false;
    formGroup1: FormGroup;
    formGroup2: FormGroup;
    formGroup3: FormGroup;
    formGroup4: FormGroup;
    formGroup5: FormGroup;
    constructor(private _formBuilder: FormBuilder) {}
    ngOnInit() {
      this.formGroup1 = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
      });
      this.formGroup2 = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
      });
      this.formGroup3 = this._formBuilder.group({
        thirdCtrl: ['', Validators.required]
      });
      this.formGroup4 = this._formBuilder.group({
        fourthCtrl: ['', Validators.required]
      });
      this.formGroup5 = this._formBuilder.group({
        fifthCtrl: ['', Validators.required]
      });
    }
  }
