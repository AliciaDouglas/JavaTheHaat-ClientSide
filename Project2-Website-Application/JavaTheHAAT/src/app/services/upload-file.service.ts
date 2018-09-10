import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable()
export class UploadFileService {

  FOLDER = 'jsa-s3/';
  constructor() { }

  uploadfile(file) {

    const bucket = new S3(
      {
        accessKeyId: 'AKIAJQXVPEITG2RP2B2A',
        secretAccessKey: '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',
        region: 'us-east-1'
      }
    );

    const params = {
      Bucket: 'java-the-haat',
      Key: this.FOLDER + file.name,
      ContentType: 'video/mp4',
      Body: file
    };

    bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }

      console.log('Successfully uploaded file.', data);
      return true;
    });
  }

}
