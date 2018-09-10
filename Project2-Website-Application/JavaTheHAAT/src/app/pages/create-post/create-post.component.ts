import { SafeResourceUrl } from '@angular/platform-browser';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { Posts } from '../../models/posts';
import { Users } from '../../models/users';
import { Steps } from '../../models/steps';
import { UploadFileService } from '../../services/upload-file.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  // Declare variables
  user: Users;
  stepsAmount: number[] = [0];
  stepNumber = 0;

  // I will .push a new stepper into the post.steps [] if the user clicks add button
  stepper: Steps = {
    stepNum: 1,
    stepName: '',
    stepText: '',
    pic: ''
  };

  // I will send this post object to the api after the user completes all the fields required for it
  post: Posts = {
     id: 193,
     pId: 97,
     user: {
       uId: 4,
       fname: 'Tyler',
       lname: 'Ak',
       email: 'Tyler@reva.com',
      username: 'Tyler',
      password: '123',
      profilePic: 'string to pic',
      accTypeId: 1,
      accType: {
          accTypeId: 1,
          accType: 'User'
      },
       accStatusId: 1,
       accStatus: {
          accStatusId: 1,
          accStatus: 'active'
        }
},
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
     ]
  };

  // Declaring variable of type FileList, this will store the files uploaded by the user
  selectedFiles: FileList;

  // Dependency Injection of UsersService, UploadFileService
  constructor(private userService: UsersService, private uploadService: UploadFileService) { }

  ngOnInit() {
    this.stepsAmount.length = 0;
  }

  // Method adds a new step in the post.steps []. Invoked when user clicks the + button
  addStep() {
    console.log('invoked add a step');
    this.stepsAmount.push(++this.stepNumber);
    const newStep: Steps = {
          stepNum: 1,
          stepName: '',
          stepText: '',
          pic: ''
    };
    newStep.stepNum = ++this.stepper.stepNum;
    this.post.steps.push(newStep);
    console.log('stepNum is: ' + this.stepNumber);
  }

  // Method removes the last step in the post.steps []. Invoked when user clicks the - button
  removeStep() {
    console.log('invoked remove a step');
    this.post.steps.pop();
    this.stepsAmount.pop();
    --this.stepNumber;
    --this.stepper.stepNum;
  }

  // This method will send a post request to the API and invokes the upload() method
  makeAPost() {
    this.upload();
    this.userService.createAPost(this.post).subscribe(r => {});
  }

  // This method will send the uploaded file to AWS S3 bucket. Also, it sets the link for the post.video = to the S3 bucket location
  upload() {
    const file = this.selectedFiles.item(0);
    const fileName: SafeResourceUrl = file.name.split(' ').join('+');
    this.post.video = 'https://s3.us-east-2.amazonaws.com/java-the-haat/jsa-s3/' + fileName;
    this.uploadService.uploadfile(file);
  }

  // This method will be invoked when a user uploads a file. it sets the file equal to this.selectedFiles global variable
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

}
