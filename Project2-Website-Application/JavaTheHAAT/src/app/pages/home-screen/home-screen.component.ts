import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/models/posts';
import { HttpClient } from '@angular/common/http';
import { UsersService } from 'src/app/services/users.service';
import { SafePipe } from 'src/app/pipes/safe.pipe';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {
  posts: Posts[];

  constructor(private http: HttpClient, private userService: UsersService, private safePipe: SafePipe) { }

  ngOnInit() {
    this.getAllPosts();
    for (let i = 0; i < this.posts.length; i++) {
      this.posts[i].video = this.safePipe.transform(this.posts[i].video);
    }
  }

  // This method will get all posts... It hould be changed to getAllPostsByUid, so a user can only see their posts
  getAllPosts() {
    this.userService.getAllPosts().subscribe(result => {
      console.log('This is the JSON title of first:' + result[0].title);
      this.posts = result;
    });
  }

}
