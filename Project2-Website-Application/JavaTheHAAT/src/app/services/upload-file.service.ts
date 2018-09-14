import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable()
export class UploadFileService {

  FOLDER = 'jsa-s3/';

        // Defining & locating the s3 bucket instance
        bucket = new S3(
          {
            accessKeyId: '***********************',
            secretAccessKey: '********************',
            region: 'us-east-1'
          }
        );


  constructor() { }

  // This method will send a file of contentType video/mp4 to Humphrey S3 bucket instance (private credentials!!)
  // Must not push the correct accessKeyId or the correct secretAccessKey... change those values before pushing to github
  uploadfile(file) {

    // setting the headers and body for the post/put request
    const params = {
      Bucket: 'java-the-haat',
      Key: this.FOLDER + file.name,
      ContentType: 'video/mp4',
      Body: file
    };

    // send params to the s3 bucket
    this.bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }

      console.log('Successfully uploaded file.', data);
      return true;
    });
  }

  uploadfilePic(file) {

    // setting the headers and body for the post/put request
    const params = {
      Bucket: 'java-the-haat',
      Key: this.FOLDER + file.name,
      ContentType: 'image/jpeg',
      Body: file
    };

    // send params to the s3 bucket
    this.bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }

      console.log('Successfully uploaded file.', data);
      return true;
    });
  }

}
