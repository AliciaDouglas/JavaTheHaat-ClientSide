import { SafePipe } from './../../pipes/safe.pipe';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Posts } from '../../models/posts';
import { Users } from '../../models/users';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-view-user-profile',
  templateUrl: './admin-view-user-profile.component.html',
  styleUrls: ['./admin-view-user-profile.component.css']
})

export class AdminViewUserProfileComponent implements OnInit {

  posts: Posts[];
  currentUser: Users;
  userProfile: Users;

  constructor(private http: HttpClient, private userService: UsersService, private safePipe: SafePipe, private route: ActivatedRoute) { }

  // This will initiate when the page loads
  // Using safePipe - This will sanitize the dynamtic src url for <iframe> tag (Needed in order to perform interpolation element attribute
  ngOnInit() {
    this.currentUser = this.userService.currentUser;
    this.userService.getUserById(+this.route.snapshot.paramMap.get('id')).subscribe((userProfile) => {
      this.userProfile = userProfile;
    });
    this.getAllPostsByUserId(+this.route.snapshot.paramMap.get('id'));
    for (let i = 0; i < this.posts.length; i++) {
      this.posts[i].video = this.safePipe.transform(this.posts[i].video);
    }
  }

  // This method will get all posts... It hould be changed to getAllPostsByUid, so a user can only see their posts
  getAllPostsByUserId(uId: number) {
    this.userService.getAllPostsByUser(uId).subscribe(result => {
      console.log('This is the JSON title of first:' + result);
      this.posts = result;
    });
  }
}
