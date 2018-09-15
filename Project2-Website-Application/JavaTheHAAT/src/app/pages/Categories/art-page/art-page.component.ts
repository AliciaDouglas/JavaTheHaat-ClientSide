import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/models/posts';
import { Users } from 'src/app/models/users';
import { HttpClient } from '@angular/common/http';
import { UsersService } from 'src/app/services/users.service';
import { SafePipe } from 'src/app/pipes/safe.pipe';

@Component({
  selector: 'app-art-page',
  templateUrl: './art-page.component.html',
  styleUrls: ['./art-page.component.css']
})
export class ArtPageComponent implements OnInit {
  posts: Posts[];

  constructor(private http: HttpClient, private userService: UsersService, private safePipe: SafePipe) { }

  ngOnInit() {
    this.getAllPostsByCategory();
    for (let i = 0; i < this.posts.length; i++) {
      this.posts[i].video = this.safePipe.transform(this.posts[i].video);
    }
  }

  // This method will get all posts... It hould be changed to getAllPostsByUid, so a user can only see their posts
  getAllPostsByCategory() {
    this.userService.getAllPostsByCategory(4).subscribe(result => {
      console.log('This is the JSON title of first:' + result[0].title);
      this.posts = result;
    });
  }
}
