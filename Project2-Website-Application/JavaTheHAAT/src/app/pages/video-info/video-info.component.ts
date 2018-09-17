import { Component, OnInit } from '@angular/core';
import { Posts } from '../../models/posts';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { SafePipe } from '../../pipes/safe.pipe';
import { Comments } from '../../models/comments';
import { Users } from '../../models/users';
import { Steps } from '../../models/steps';

@Component({
  selector: 'app-video-info',
  templateUrl: './video-info.component.html',
  styleUrls: ['./video-info.component.css']
})
export class VideoInfoComponent implements OnInit {

  stepper: Steps = {
    stepNum: 1,
    stepName: '',
    stepText: '',
    pic: ''
  };

  currentPost: Posts = null;
  bAuthenticated = false;
  currentUser: Users;
  isAdmin = true;
  viewer: boolean;
  editPost = false;
  newComment: Comments = {
      cId: 0,
      commentText: '',
      pId: 0,
      timeSubmission: '',
      uId: this.userService.currentUser.uId
  };

  constructor(private userService: UsersService, private safePipe: SafePipe, private route: ActivatedRoute) {

  }

  // Initializes the currentPost variable upon loadin the page and gets the post from the server
  ngOnInit() {
    this.currentPost = {
      uId: 0,
      title : '',
      description: '',
      video : '',
      categoryId: 2,
      steps: [
        {
        stepNum: 1,
        stepName: '',
        stepText: '',
        pic: ''
        }
      ],
      comments: []
   };
   this.userService.getAllPostsByPid(+this.route.snapshot.paramMap.get('id')).subscribe((post) => {
     console.log(post);
    this.currentPost = post;
    this.newComment.pId = post.pId;
  });
  this.currentUser = this.userService.currentUser;
  if (this.currentUser.accTypeId !== 2) {
    this.isAdmin = false;
  } if (this.currentUser.accTypeId === 0) {
    this.viewer = true;
  }
  }

  // Essentially this method modifies a post by creating a new comment object inside the post. Then via post request
  // Sending that comment object to the server. We then make another request to the database to get the most recent post.
  makeNewComment() {
    console.log('sending: ' + this.newComment.commentText);
  this.userService.createComment(this.newComment).subscribe((r) => {});
  this.userService.getAllPostsByPid(+this.route.snapshot.paramMap.get('id')).subscribe((post) => {
  this.currentPost = null;
    console.log(post);
   this.currentPost = post;
   this.newComment.pId = post.pId;
   this.newComment.commentText = '';
 });
   this.ngOnInit();
  }

  // An admin can delete comments
  deleteComment(comment: Comments) {
    this.userService.deleteComment(comment).subscribe((r) => {});
  }

  // An an admin or the user who created the post can delete it
  deletepost() {
    this.userService.deleteMyPost(this.currentPost).subscribe((r) => {});
  }

  changePost() {
    this.editPost = true;
  }
  addStep() {
    this.currentPost.steps.push(this.stepper);
  }

  deleteStep() {
    this.currentPost.steps.pop();
  }

  updatePost() {
    this.currentPost.user = null;
    console.log(this.currentPost);
    this.userService.updatePost(this.currentPost).subscribe((r) => {});
  }
}
