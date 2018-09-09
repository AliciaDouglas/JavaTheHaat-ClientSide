import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthorizationService } from '../../service/authorization.service';
import { Users } from '../../models/users';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  emailVerificationMessage = false;

  constructor(private auth: AuthorizationService, private _router: Router) { }

  onSubmit(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;

    this.auth.signIn(email, password).subscribe((data) => {
      this._router.navigateByUrl('/');
    }, (err) => {
      this.emailVerificationMessage = true;

    });
  // user: Users;

  // constructor(private ROUTE: Router) { }

  // }

  // login() {
  //   console.log('login function invoked');
  //   this.ROUTE.navigate(['home-screen']);
  // }

  // loginUser(user: User){
  //   this.loginService.validLoginUser(user).subscribe(
  //     succ => {
  //       this.dbUser = succ;
  //       this.incorrect = false;
  //       this.loginService.saveUser(succ);
  //       this.ROUTE.navigate(['dashboard']);
  //     }, err => {
  //       console.log('login failed')
  //       this.incorrect = true;
  //     }
  //     );
  // }

}
}
