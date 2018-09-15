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

  constructor(private userService: UsersService) { }

  ngOnInit() {
    console.log(this.userService.currentUser.fname);

}
}
