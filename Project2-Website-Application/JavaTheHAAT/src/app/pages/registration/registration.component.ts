import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AuthorizationService } from '../../service/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    isLinear = false;
    formGroup1: FormGroup;
    formGroup2: FormGroup;
    confirmCode = false;
    codeWasConfirmed = false;
    error = '';

    constructor(private _formBuilder: FormBuilder, private auth: AuthorizationService,
    private _router: Router) {}

    ngOnInit() {
      this.formGroup1 = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
      });
      this.formGroup2 = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
      });
    }

    register(form: NgForm) {
      const email = form.value.email;
      const password = form.value.password;
      this.auth.register(email, password).subscribe(
        (data) => {
          this.confirmCode = true;
        },
        (err) => {
          console.log(err);
          this.error = 'Registration Error has occurred';
        }
      );
    }

    validateAuthCode(form: NgForm) {
      const code = form.value.code;

      this.auth.confirmAuthCode(code).subscribe(
        (data) => {
          // this._router.navigateByUrl('/');
          this.codeWasConfirmed = true;
          this.confirmCode = false;
        },
        (err) => {
          console.log(err);
          this.error = 'Confirm Authorization Error has occurred';
        });
    }
  }
