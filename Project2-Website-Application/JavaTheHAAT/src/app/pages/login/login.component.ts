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

}
