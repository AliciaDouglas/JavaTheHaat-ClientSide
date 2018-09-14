import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/models/posts';
import { Users } from 'src/app/models/users';
import { HttpClient } from '@angular/common/http';
import { UsersService } from 'src/app/services/users.service';
import { SafePipe } from 'src/app/pipes/safe.pipe';

@Component({
  selector: 'app-outdoors-page',
  templateUrl: './outdoors-page.component.html',
  styleUrls: ['./outdoors-page.component.css']
})
export class OutdoorsPageComponent implements OnInit {
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

  // This method will get all posts... It hould be changed to getAllPostsByUid, so a user can only see their posts
  getAllPosts() {
    this.userService.getAllPosts().subscribe(result => {
      console.log('This is the JSON title of first:' + result[0].title);
      this.posts = result;
    });
  }

  /* This method will get the currentLogged in user... Should be changed later because cognito will save the user in the userpool
    So we can get them from there without making another reuqest to the server */
  getUser(uId: number) {
    this.userService.getUserById(uId).subscribe(result => {
      console.log('The user is: ' + result.fname);
      this.user = result;
    });
  }

}
