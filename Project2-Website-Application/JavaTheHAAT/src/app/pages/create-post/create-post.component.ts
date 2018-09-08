import { Component, OnInit } from '@angular/core';
import { Posts } from '../../models/posts';
import { Users } from '../../models/users';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  user: Users;
  steps: number[] = [0];
  post: Posts = {

     uId: 2,
     title : 'How to program',
     description: 'blah blah',
     video : 'string to video',
     categoryId: 2,
     steps: []
  };

  constructor() { }

  ngOnInit() {

    this.steps.length = 1;
  }

  addStep() {
    console.log('invoked add a step');
    this.steps.length++;
  }

  removeStep() {
    console.log('invoked add a step');
    this.steps.length--;
  }

}
