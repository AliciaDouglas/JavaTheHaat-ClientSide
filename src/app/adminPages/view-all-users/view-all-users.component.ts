import { Users } from './../../models/users';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.component.html',
  styleUrls: ['./view-all-users.component.css']
})
export class ViewAllUsersComponent implements OnInit {

  allUsers: Users[];

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    this.usersService.getAllUsers().subscribe(dataUsers => {
      this.allUsers = dataUsers;
    });
  }

  // This click event will change a user's status from active to inactive
  makeInactive(user: Users) {
    console.log(user);
    user.accStatusId = 2;
    user.accStatus.accStatus = 'Inactive';
    user.accStatus.accStatusId = 2;
    this.usersService.updateUserInfo(user).subscribe((r) => {});
  }

  // This click event will change a user's status from inactive to active
  makeActive(user: Users) {
    user.accStatusId = 1;
    user.accStatus.accStatus = 'Active';
    user.accStatus.accStatusId = 1;
    this.usersService.updateUserInfo(user).subscribe((r) => {});
  }

  // The admin can go to view the specific user's profile
  viewUser(user: Users) {
    this.usersService.userAdminIsViewing = user;
    this.router.navigate(['admin-view-profile']);
  }

}
