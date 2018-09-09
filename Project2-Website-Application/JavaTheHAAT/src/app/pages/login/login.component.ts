import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/users';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Users;

  constructor(private ROUTE: Router) { }

  ngOnInit() {
  }

  login() {
    console.log('login function invoked');
    this.ROUTE.navigate(['home-screen']);
  }

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
