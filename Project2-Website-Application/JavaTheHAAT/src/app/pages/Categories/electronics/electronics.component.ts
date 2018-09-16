import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/models/posts';
import { Users } from 'src/app/models/users';
import { HttpClient } from '@angular/common/http';
import { UsersService } from 'src/app/services/users.service';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-electronics',
  templateUrl: './electronics.component.html',
  styleUrls: ['./electronics.component.css']
})
export class ElectronicsComponent implements OnInit {
  posts: Posts[];
  bAuthenticated = false;
  currentUser: Users;
  isAdmin = true;
  viewer: boolean;

  constructor(private http: HttpClient, private userService: UsersService, private safePipe: SafePipe, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.userService.currentUser;
    if (this.currentUser.accTypeId !== 2) {
      this.isAdmin = false;
    } if (this.currentUser.accTypeId === 0) {
      this.viewer = true;
    }
    this.getAllPostsByCategory();
    for (let i = 0; i < this.posts.length; i++) {
      this.posts[i].video = this.safePipe.transform(this.posts[i].video);
    }
  }

  // This method will get all posts... It hould be changed to getAllPostsByUid, so a user can only see their posts
  getAllPostsByCategory() {
    this.userService.getAllPostsByCategory(6).subscribe(result => {
      console.log('This is the JSON title of first:' + result[0].title);
      this.posts = result;
    });
  }

    // When they click on a post they are redirected to the single-post view
    viewPost(pId: number) {
      this.router.navigate(['video-info/' + pId]);
    }
}
