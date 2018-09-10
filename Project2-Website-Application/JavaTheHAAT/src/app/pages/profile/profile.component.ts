import { SafePipe } from './../../pipes/safe.pipe';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Posts } from '../../models/posts';
import { Users } from '../../models/users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  posts: Posts[];
  user: Users;

  constructor(private http: HttpClient, private userService: UsersService, private safePipe: SafePipe) { }

  ngOnInit() {
    this.getAllPosts();
    this.user = null;
    this.getUser(2);
    for (let i = 0; i < this.posts.length; i++) {
      this.posts[i].video = this.safePipe.transform(this.posts[i].video);
    }
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
