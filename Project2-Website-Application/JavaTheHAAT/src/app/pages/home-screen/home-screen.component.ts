import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/models/posts';
import { HttpClient } from '@angular/common/http';
import { UsersService } from 'src/app/services/users.service';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { Users } from '../../models/users';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {
  posts: Posts[];

  bAuthenticated = false;
  currentUser: Users;
  isAdmin = true;

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.userService.currentUser;
    if (this.currentUser.accTypeId === 1) {
      this.isAdmin = false;
    }
}
}
