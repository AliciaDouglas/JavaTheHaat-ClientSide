import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { CognitoService } from '../../services/cognito.service';
import { Users } from '../../models/users';
import { UsersService } from '../../services/users.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: Users;
  infoMessage: string;
  errorMessage: string;
  loginForm: FormGroup;
  submitted: boolean;

  constructor(
    private cognitoService: CognitoService,
    private router: Router,
    private userService: UsersService,
    private formBuilder: FormBuilder
  ) { }

  /**
  * This method runs when the component is initialized. It checks if the user
  * is logged in and, if they are, sends them to the dashboard page.
  */
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
   this.user = {
      uId: 0,
      fname: '',
      lname: '',
      email: '',
      username: '',
      password: '',
      profilePic: '',
      accTypeId: 0,
      accType: null,
      accStatusId: 0,
      accStatus: null
    };
}
get f() { return this.loginForm.controls; }

  onSubmit() {
    console.log('login method called');
    this.errorMessage = '';
    this.infoMessage = '';
    this.submitted = true;
    sessionStorage.clear();

    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.user.email = this.loginForm.get('email').value;
    this.user.password = this.loginForm.get('password').value;

    if (this.loginForm.invalid) {
      alert('Please Check Form Entries for Accuracy');
      return;
    }

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
            this.userService.getUserByEmailAndPassword(this.user).subscribe(
              currentUser => {

                  sessionStorage.setItem('user', JSON.stringify(currentUser));
                  this.userService.user.next(currentUser);
                  this.userService.currentUser = currentUser;
                  this.router.navigate(['home-screen']);

              });
          }
        });
      }
    }
