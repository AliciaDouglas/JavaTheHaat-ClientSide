import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/users';
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

  makeInactive(user: Users) {
    console.log(user);
    user.accStatusId = 2;
    user.accStatus.accStatus = 'Inactive';
    user.accStatus.accStatusId = 2;
    this.usersService.updateUserInfo(user).subscribe((r) => {});
  }

  makeActive(user: Users) {
    user.accStatusId = 1;
    user.accStatus.accStatus = 'Active';
    user.accStatus.accStatusId = 1;
    this.usersService.updateUserInfo(user).subscribe((r) => {});
  }

  viewUser(userId: number) {
    this.router.navigate(['admin-view-profile/' + userId]);
  }

}
