import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CognitoService } from '../../services/cognito.service';
import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/users';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
// registerForm and submitted are included in the registration form. Registered users are assigned to the User object
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  user: Users;
  registration = false;
  registerMessage = 'Registration Successful';

// Cognito Service takes user credentials and verifies with cognito user pool, user credentials then passed to UsersService
  constructor(
    private cognitoService: CognitoService,
    private router: Router,
    private userService: UsersService,
    private formBuilder: FormBuilder
  ) { }
// This allows the error message to be displayed to the user
  errorMessage: string;
// registration form fields are validated onInit, currently, required, email, and miin length password are set
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userName: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
    // empty/null user object will be used as a schema to hold user data and send to DB
    this.user = {
      fname: '',
      lname: '',
      email: '',
      username: '',
      password: '',
      profilePic: '',
      accTypeId: 1,
      accStatusId: 1,
    };
  }
// f is a shortcut function used in the registerform formControl
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      this.registration = true;
      const email = this.registerForm.get('email').value;
      const password = this.registerForm.get('password').value;
      const firstName = this.registerForm.get('firstName').value;
      const lastName = this.registerForm.get('lastName').value;
      // if the form validator conditions are not met, user is alerted and will be unable to submit form
        if (this.registerForm.invalid) {
        alert('Please Check Form Entries for Accuracy');
        return;
      }
      // Taking user info input into form and sending to cognito to register in user pool,
      // then sends to userService persisting registration in DB
      this.cognitoService.registerUser(email, password, firstName, lastName).subscribe(
        result => {
          if (result) {
            // If the operation returned an error
            if (result['message']) {
              this.errorMessage = result['message'];
            } else {
              console.log('cognito registration successful!');
            }
          }
        }
      );
      this.userService.registerUser(this.user).subscribe(
        result => {
    });
  }
}
