import { Injectable } from '@angular/core';
import * as AWSCognito from 'amazon-cognito-identity-js';
import { CognitoIdToken } from 'amazon-cognito-identity-js';
import { BehaviorSubject } from 'rxjs';
import { Users } from '../models/users';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  private userPool: AWSCognito.CognitoUserPool;

// Amazon Cognito userpool credentials Needed for Cognito Functionality
  constructor(private userService: UsersService) {
    const poolData = {
      UserPoolId : 'us-east-2_5gy8Fh6Rg',
      ClientId : '7323ifamj94epcbammi3edpei7'
    };

    this.userPool = new AWSCognito.CognitoUserPool(poolData);
  }

  // Register User FOR COGNITO! method takes in user info , passes to Behavior Subject Object FOR COGNITO
  registerUser(email: string, password: string, firstName: string, lastName: string): BehaviorSubject<Users> {
    console.log('[LOG] - In CognitoService.registerUser()');

    const attributeList = [];

    // First add the user data to some data objects. The Name attribute
    // is the name of the user attribute in the cognito user pool.
    const emailData = {
      Name: 'email',
      Value: email
    };

    const firstNameData = {
      Name: 'given_name',
      Value: firstName
    };

    const lastNameData = {
      Name: 'family_name',
      Value: lastName
    };

    // Wrap up the data objects as cognito user attributes
    const emailAttribute = new AWSCognito.CognitoUserAttribute(emailData);
    const firstNameAttribute = new AWSCognito.CognitoUserAttribute(firstNameData);
    const lastNameAttribute = new AWSCognito.CognitoUserAttribute(lastNameData);

    // Add everything to the list of attributes
    attributeList.push(emailAttribute);
    attributeList.push(firstNameAttribute);
    attributeList.push(lastNameAttribute);

    // Attempt to add the new user to the pool
    const resultStream = new BehaviorSubject<object>(null);
    this.userPool.signUp(email, password, attributeList, null,
      (error, result) => {
        if (error) {
          resultStream.next(error);
        }
        if (result) {
          resultStream.next(result);
        }
      }
    );

    return resultStream;
  }

  /**
   * This method attempts to sign in the user. If the user is in the pool,
   * it returns a CognitoIdToken. Otherwise it returns an error object.
   * @param email The email address that the user entered
   * @param password The password that the user entered
   */
  signIn(email: string, password: string): BehaviorSubject<object> {
    const userData = {
      Username: email,
      Pool: this.userPool
    };

    const authenticationData = {
      Username: email,
      Password: password
    };

    const authenticationDetails = new AWSCognito.AuthenticationDetails(authenticationData);

    const cognitoUser = new AWSCognito.CognitoUser(userData);

    const resultStream = new BehaviorSubject<object>(null);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(session: AWSCognito.CognitoUserSession) {
        console.log('[LOG] - Cognito login succeeded');
        resultStream.next(session.getIdToken());
      },
      onFailure: function(err: any) {
        console.log('[ERROR] - Failed to authenticate user');
        resultStream.next(err);
      },

    });

    return resultStream;
  }
}
