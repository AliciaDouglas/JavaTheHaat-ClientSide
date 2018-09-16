import { Category } from './../../models/category';
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
  currentUser: Users;
  stepsAmount: number[] = [0];
  stepNumber = 0;
  stepArrayIndexNum = 0;

  // Declaring variable of type FileList, this will store the files uploaded by the user
  selectedFiles: FileList;
  stepPicFiles: FileList;

  // I will .push a new stepper into the post.steps [] if the user clicks add button
  stepper: Steps = {
    stepNum: 1,
    stepName: '',
    stepText: '',
    pic: ''
  };

  // Initalize Object. I will send this post object to the api after the user completes all the fields required for it
  post: Posts = {
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
     ]
  };

  // Dependency Injection of UsersService, UploadFileService
  constructor(private userService: UsersService, private uploadService: UploadFileService) { }

  ngOnInit() {
    this.stepsAmount.length = 0;
    this.currentUser = this.userService.currentUser;
    this.post.uId = this.currentUser.uId;
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

  // This method will send the uploaded file to AWS S3 bucket. Also, it sets the link for the post.video = to the S3 bucket location
  uploadStepPics() {
    const file = this.stepPicFiles.item(0);
    const fileName: SafeResourceUrl = file.name.split(' ').join('+');
    this.post.steps[this.stepArrayIndexNum].pic = 'https://s3.us-east-2.amazonaws.com/java-the-haat/jsa-s3/' + fileName;
    this.uploadService.uploadfilePic(file);
    setTimeout(this.changeImage('https://s3.us-east-2.amazonaws.com/java-the-haat/jsa-s3/' + fileName), 10000);
  }
  // This method will be invoked when a user uploads a file. it sets the file equal to this.selectedFiles global variable
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  // This method be invoked when a user clicks on the "add pic" image.
  // It takes in the current step object as a parameter, and forces a click event on the <input type="file"..> HTML Element
  stepPicUpload(step: Steps) {
    this.stepArrayIndexNum = step.stepNum - 1;
    const fileUpload = document.getElementById('FileUpload1');
    fileUpload.click();
  }


  // (invoked) Change event on <input type="file"..> HTML Element
  // This method reads the file that the user uploads and sets the global variable stepPicFiles equal to it
  readFileUpload(event) {
    this.stepPicFiles = event.target.files;
    this.uploadStepPics();
  }

  // Method invoked inside the uploadStepPics() method
  // It changes the current src of the HTML image element to the s3 bucket url path of the file they just uploaded
  changeImage(srcLink: string) {
    const image = (<HTMLImageElement>document.getElementsByClassName('pImg')[this.stepArrayIndexNum]);
    console.log(image);
    image.src = srcLink;
  }

  /* Invoked as a change event. When a user selects a category for the post.
   This method will assign the corresponding categoryId to the post */
  setCategory(event) {

    switch (event.target.value) {

      case 'Craft': {
         this.post.categoryId = 1;
         break;
      }
      case 'Home Improvement': {
        this.post.categoryId = 2;
         break;
      }
      case 'Food': {
        this.post.categoryId = 3;
         break;
      }
      case 'Art': {
        this.post.categoryId = 4;
         break;
      }
      case 'Outdoors/Garden': {
        this.post.categoryId = 5;
         break;
      }
      case 'Electronics': {
        this.post.categoryId = 6;
         break;
      }
      default: {
         break;
      }
   }
}
}
