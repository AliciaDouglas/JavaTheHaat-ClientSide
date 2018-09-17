import { Steps } from './../../models/steps';
import { Comments } from './../../models/comments';
import { Component, OnInit } from '@angular/core';
import { Posts } from '../../models/posts';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { SafePipe } from '../../pipes/safe.pipe';
import { Users } from '../../models/users';

@Component({
  selector: 'app-video-info',
  templateUrl: './video-info.component.html',
  styleUrls: ['./video-info.component.css']
})
export class VideoInfoComponent implements OnInit {


  askEdit = true;
  saveUpdate;

  postObj: Posts = {
      categoryId: 2,
      comments: [],
      title : '',
      description: '',
      pId: 0,
      steps: [
        {
        stepNum: 1,
        stepName: '',
        stepText: '',
        pic: ''
        }
      ],
      timeSubmission: '',
      uId: 0,
      video : '',
   };

  stepper: Steps = {
    pId: 0,
    stepNum: 1,
    stepName: '',
    stepText: '',
    pic: ''
  };

  deleteCommentObj: Comments = {
    cId: 0,
    commentText: 'string',
    pId: 0,
    timeSubmission: '2018-09-17T03:24:49.290Z',
    uId: 0
  };

  currentPost = null;
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
  this.userService.createComment(this.newComment).subscribe((r) => {
    this.userService.getAllPostsByPid(+this.route.snapshot.paramMap.get('id')).subscribe((post) => {
      this.currentPost = null;
        console.log(post);
       this.currentPost = post;
       this.newComment.pId = post.pId;
       this.newComment.commentText = '';
     });
  });
   this.ngOnInit();
  }

  // An admin can delete comments
  deleteComment(comment) {
    this.deleteCommentObj.cId = comment.cId;
    this.deleteCommentObj.commentText = comment.commentText;
    this.deleteCommentObj.pId = comment.pId;
    this.deleteCommentObj.timeSubmission = comment.timeSubmission;
    this.deleteCommentObj.uId = comment.uId.uId;
    console.log(this.deleteCommentObj);
    this.userService.deleteComment(this.deleteCommentObj).subscribe((r) => {
      this.userService.getAllPostsByPid(+this.route.snapshot.paramMap.get('id')).subscribe((post) => {
        console.log(post);
       this.currentPost = post;
       this.newComment.pId = post.pId;
     });
    });
  }

  // An an admin or the user who created the post can delete it
  deletePost() {
    this.postObj.categoryId = this.currentPost.categoryId;
    for (let i = 0; i < this.currentPost.comments.length; i++) {
      const shapeCommentObj = {
        cId: 0,
        commentText: '',
        pId: 0,
        timeSubmission: '',
        uId: 0
      };
      this.postObj.comments[i] = shapeCommentObj;
      this.postObj.comments[i].uId = this.currentPost.comments[i].uId.uId;
      this.postObj.comments[i].cId = this.currentPost.comments[i].cId;
      this.postObj.comments[i].commentText = this.currentPost.comments[i].commentText;
      this.postObj.comments[i].pId = this.currentPost.comments[i].pId;
      this.postObj.comments[i].timeSubmission = this.currentPost.comments[i].timeSubmission;
    }
    this.postObj.description = this.currentPost.description;
    this.postObj.pId = this.currentPost.pId;
    this.postObj.steps = this.currentPost.steps;
    this.postObj.timeSubmission = this.currentPost.timeSubmission;
    this.postObj.title = this.currentPost.title;
    this.postObj.uId = this.currentPost.uId;
    this.postObj.video = this.currentPost.video;
    console.log(this.currentPost.uId);
    console.log(this.postObj);
    this.userService.deleteMyPost(this.postObj).subscribe((r) => {
    });
  }

  changePost() {
    this.editPost = true;
    this.askEdit = false;
    this.saveUpdate = true;
  }
  addStep() {
    const stepper: Steps = {
      pId: 0,
      stepNum: 1,
      stepName: '',
      stepText: '',
      pic: ''
    };
    stepper.pId = this.currentPost.pId;
    stepper.stepNum = this.currentPost.steps.length + 1;
    console.log(this.stepper);
    this.currentPost.steps.push(this.stepper);
  }

  deleteStep() {
    this.currentPost.steps.pop();
  }

  updatePost() {
    this.editPost = false;
    this.askEdit = true;
    this.saveUpdate = false;
    this.currentPost.user = null;
    console.log(this.currentPost);
    this.userService.updatePost(this.currentPost).subscribe((r) => {
      this.userService.getAllPostsByPid(+this.route.snapshot.paramMap.get('id')).subscribe((post) => {
        this.currentPost = null;
          console.log(post);
         this.currentPost = post;
         this.newComment.pId = post.pId;
         this.newComment.commentText = '';
       });
    });
  }
}
