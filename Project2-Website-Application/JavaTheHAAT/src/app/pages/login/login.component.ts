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
    // if (sessionStorage.getItem('user')) {
    //   this.userService.user.next(JSON.parse(sessionStorage.getItem('user')));
    //   this.router.navigate(['dashboard']);
    }

    /*
    * If the user has just registered a new account, this will display a message
    * telling them to click the verification link in the email we sent them.
    */
    // const info = sessionStorage.getItem('info');
    // if (info) {
    //   this.infoMessage = info;
    // }
  // }

  /**
  * This method is called whenever the user clicks the login button. It will attempt
  * to authenticate the user in the cognito user pool and if the credentials are valid
  * it will send them to the dashboard.
  */
  login() {
    console.log('login method called');
    // Clear the error message
    this.errorMessage = '';

    // Clear sessionStorage as well
    this.infoMessage = '';
    sessionStorage.clear();

    // Check if there are any errors in the form
    // if (
    //   this.loginForm.get('email').errors ||
    //   this.loginForm.get('password').errors
    // ) {
    //   this.errorMessage = 'Errors exist on the form';
    // } else {
      // No form errors. Attempt to login.
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

            this.userService.getUserByEmail(email).subscribe(
              user => {
                if (user) {
                  /*
                  * This is here to fix a strange problem. We are using json server
                  * to mimic a functional backend. When you query json server for a
                  * record, it tends to return a list even if there is only one matching
                  * row in the database. In the future when the real backend is connected,
                  * that won't be a problem. So I decided to check if the result is an
                  * array and if so get the first item as the user.
                  */
                  if (user['length']) {
                    user = user[0];
                  }

                  sessionStorage.setItem('user', JSON.stringify(user));
                  this.usersService.user.next(user);
                  this.router.navigate(['dashboard']);
                }
              }
            );
          }
        }
      );
    }
  }


