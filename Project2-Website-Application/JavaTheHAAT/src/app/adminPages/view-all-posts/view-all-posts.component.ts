import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Posts } from '../../models/posts';
import { Users } from '../../models/users';
import { UsersService } from './../../services/users.service';

@Component({
  selector: 'app-view-all-posts',
  templateUrl: './view-all-posts.component.html',
  styleUrls: ['./view-all-posts.component.css']
})
export class ViewAllPostsComponent implements OnInit {

  posts: Posts[];
  user: Users;

  constructor(private http: HttpClient, private userService: UsersService) { }

  ngOnInit() {

    this.getAllPosts();
    this.user = null;
    this.getUser(2);
  }

  getAllPosts() {
    this.userService.getAllPosts().subscribe(result => {
      console.log('This is the JSON title of first:' + result[0].title);
      this.posts = result;
    });
  }

  getUser(uId: number) {
    this.userService.getUserById(uId).subscribe(result => {
      console.log('The user is: ' + result.fname);
      this.user = result;
    });
  }

}