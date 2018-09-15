import { Component, OnInit } from '@angular/core';
import { Posts } from '../../models/posts';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { SafePipe } from '../../pipes/safe.pipe';
import { Comments } from '../../models/comments';

@Component({
  selector: 'app-video-info',
  templateUrl: './video-info.component.html',
  styleUrls: ['./video-info.component.css']
})
export class VideoInfoComponent implements OnInit {

  currentPost: Posts = null;
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
  }

  // Essentially this method modifies a post by creating a new comment object inside the post. Then via post requestm
  // Sending that comment object to the server. We then make another request to the database to get the most recent post.
  makeNewComment() {
    console.log('sending: ' + this.newComment);
  this.userService.createComment(this.newComment).subscribe((r) => {});
  this.userService.getAllPostsByPid(+this.route.snapshot.paramMap.get('id')).subscribe((post) => {
    console.log(post);
   this.currentPost = post;
   this.newComment.pId = post.pId;
   this.newComment.commentText = '';
 });
  }

}
