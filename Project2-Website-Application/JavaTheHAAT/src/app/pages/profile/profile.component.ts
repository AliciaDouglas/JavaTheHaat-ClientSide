import { SafePipe } from './../../pipes/safe.pipe';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Posts } from '../../models/posts';
import { Users } from '../../models/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  posts: Posts[];
  currentUser: Users;
  editable = false;
  hideUpdate = false;

  sendPost: Posts = {
    pId: 0,
    title: '',
    description: '',
    video: '',
    timeSubmission: '',
    categoryId: 0,
    steps: [],
    comments: [],
  };

  constructor(private http: HttpClient, private userService: UsersService, private safePipe: SafePipe, private router: Router) { }

  // This will initiate when the page loads
  // Using safePipe - This will sanitize the dynamtic src url for <iframe> tag (Needed in order to perform interpolation element attribute
  ngOnInit() {
    this.currentUser = this.userService.currentUser;
    this.getAllPostsByUserId(this.currentUser.uId);
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
    // When they click on a post they are redirected to the single-post view
    viewPost(pId: number) {
      this.router.navigate(['video-info/' + pId]);
    }

    updateMyInfo(pId: number) {
      this.router.navigate(['video-info/' + pId]);
    }

    deletePost(post: Posts) {
      this.sendPost.pId = post.pId;
      this.sendPost.uId = post.uId;
      this.sendPost.title = post.title;
      this.sendPost.description = post.description;
      this.sendPost.video = post.video;
      this.sendPost.timeSubmission = post.timeSubmission;
      this.sendPost.categoryId = post.categoryId;
      this.sendPost.steps = post.steps;
      this.sendPost.comments = post.comments;

      post.user = null;
      for (let i; i < post.comments.length; i++) {
      post.comments[i].uId = null;
      }
      console.log(post);
      this.userService.deleteMyPost(post).subscribe((r) => {});
    }

    editInfo() {
      this.editable = true;
      this.hideUpdate = true;
    }

    SaveUpdate() {
      this.editable = false;
      this.hideUpdate = false;
      this.userService.updateUserInfo(this.currentUser).subscribe((r) => {});
    }
}
