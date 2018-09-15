import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/users';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  bAuthenticated = false;
  currentUser: Users;
  isAdmin = true;

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.userService.currentUser;
    // if (this.currentUser === undefined) {
    //   this.router.navigate(['login']);
    // }
    if (this.currentUser.accTypeId === 1) {
      this.isAdmin = false;
    }
}
}
