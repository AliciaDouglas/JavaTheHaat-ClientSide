import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CognitoService } from '../../services/cognito.service';
import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/users';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private cognitoService: CognitoService,
    private router: Router,
    private userService: UsersService
  ) { }

  // This string is used when we check if the password field matches
  // the confirm password field
  message: string;

  // This string is used to display registration errors to the user
  errorMessage: string;

  // Building the form
  registrationForm = new FormBuilder().group({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email])),
    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      // ^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])
      // ^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{8,}
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$')])),

    // This one isn't actually used for verifying validity at the moment,
    // but I'm leaving it here in case a future batch wants to change that.
    confirmPassword: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(30)
    ])),
    lastName: new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(30)
    ]))
  });

  ngOnInit() {
  }

  register() {
    this.errorMessage = '';

      const email = this.registrationForm.get('email').value;
      const password = this.registrationForm.get('password').value;
      const firstName = this.registrationForm.get('firstName').value;
      const lastName = this.registrationForm.get('lastName').value;
      const userName = this.registrationForm.get('userName').value;
      const user: Users = {
        fname: firstName,
        lname: lastName,
        email: email,
        username: userName,
        profilePic: '',
        accTypeId: 2,
        accStatusId: 1
      };

      this.userService.registerUser(user);


      this.cognitoService.registerUser(email, password, firstName, lastName).subscribe(
        result => {
          if (result) {
            // If the operation returned an error
            if (result['message']) {
              this.errorMessage = result['message'];
            } else {
              console.log('made it here');
            }
          }
        }
      );
    }
  }

