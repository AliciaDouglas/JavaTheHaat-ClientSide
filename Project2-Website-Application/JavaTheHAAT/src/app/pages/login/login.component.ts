import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CognitoService } from '../../services/cognito.service';
import { Users } from '../../models/users';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // This is used to display non-error related information to the user
  infoMessage: string;

  // This is used to display errors to the user
  errorMessage: string;

  // Build the form controls.
  loginForm = new FormBuilder().group({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ])),
    password: new FormControl('', Validators.required)
  });

  // The list of error messages displayed in the mat-error elements
  loginValidationMessages = {
    'email': [
      {type: 'required', message: 'Email is required'},
      {type: 'email', message: 'Not a valid email'}
    ],
    'password': [
      {type: 'required', message: 'Password is required'}
    ]
  };
  userService: any;
  usersService: any;

  constructor(
    private cognitoService: CognitoService,
    private router: Router,
    // private userIdle: UserIdleService,
    // private appComponent: AppComponent,
    // private modal: NgbModal
  ) { }

  /**
  * This method runs when the component is initialized. It checks if the user
  * is logged in and, if they are, sends them to the dashboard page.
  */
  ngOnInit() {
    }

  login() {
    console.log('login method called');
    // Clear the error message
    this.errorMessage = '';

    // Clear sessionStorage as well
    this.infoMessage = '';
    sessionStorage.clear();

    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

      // First get the user's id token from cognito
      this.cognitoService.signIn(email, password).subscribe(
        result => {
          if (result) {
            // If there was an error
            if (result['message']) {
              this.errorMessage = 'Invalid credentials';
              return;
            }

            /*
            * If the app gets to this point, then the user exists, has the correct
            * password, and has verified their email address. Now we need to get
            * their information from the database.
            */

            this.userService.getUserByEmailAndPassword(email, password).subscribe(
              user => {


                  sessionStorage.setItem('user', JSON.stringify(user));
                  this.usersService.user.next(user);
                  this.router.navigate(['home-screen']);

              });
          }
        });
      }
    }
