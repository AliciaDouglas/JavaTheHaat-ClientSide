import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Users } from '../models/users';
import { Posts } from '../models/posts';
import { Comments } from '../models/comments';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

userAdminIsViewing: Users;

currentUser: Users = {
   uId: 0,
   fname: '',
   lname: '',
   email: '',
   username: '',
   password: '',
   profilePic: null,
   accTypeId: 0,
   accType: {
     accTypeId: 0,
     accType: ''
    },
   accStatusId: 0,
   accStatus: {
     accStatusId: 0,
     accStatus: 'Active'
    }
};

user: BehaviorSubject<Users> = new BehaviorSubject<Users>(null);

constructor(private http: HttpClient) { }


// This method registers/creates a user in the database
registerUser(user: Users): Observable<Users> {
  return this.http.post<Users>('http://ec2-18-223-33-87.us-east-2.compute.amazonaws.com:8080/users', user );
}

// This method will get a specific user by Email and password for user authentication in DB
getUserByEmailAndPassword(inputUser: Users): Observable<Users> {
  return this.http.post<Users>('http://ec2-18-223-33-87.us-east-2.compute.amazonaws.com:8080/login/', inputUser);
}

// This method will get all users from the database
getAllUsers(): Observable<Users[]> {
  return this.http.get<Users[]>('http://ec2-18-223-33-87.us-east-2.compute.amazonaws.com:8080/users');
}

// This method will get a specific user by Id
getUserById(uId: number): Observable<Users> {
  return this.http.get<Users>('http://ec2-18-223-33-87.us-east-2.compute.amazonaws.com:8080/users/' + uId);
}

// This method will update a user's profile info
updateUserInfo(user: Users): Observable<Users> {
  return this.http.put<Users>('http://ec2-18-223-33-87.us-east-2.compute.amazonaws.com:8080/users', user);
}

// This method gets all posts
getAllPosts(): Observable<Posts[]> {
  return this.http.get<Posts[]>('http://ec2-18-223-33-87.us-east-2.compute.amazonaws.com:8080/posts');
}

// This method will get all of a specific user's posts
getAllPostsByUser(uId: number): Observable<Posts[]> {
  return this.http.get<Posts[]>('http://ec2-18-223-33-87.us-east-2.compute.amazonaws.com:8080/posts/users/' + uId);
}

// This method gets all posts of a specific category
getAllPostsByCategory(categoryId: number): Observable<Posts[]> {
  return this.http.get<Posts[]>('http://ec2-18-223-33-87.us-east-2.compute.amazonaws.com:8080/posts/category/' + categoryId);
}

// This method will get a post by pId (specific post)
getAllPostsByPid(pId: number): Observable<Posts> {
  return this.http.get<Posts>('http://ec2-18-223-33-87.us-east-2.compute.amazonaws.com:8080/posts/' + pId);
}


// This method will make a post (send it to DB for persistance)
createAPost(post: Posts): Observable<Posts> {
  return this.http.post<Posts>('http://ec2-18-223-33-87.us-east-2.compute.amazonaws.com:8080/posts', post);
}

// This method will allow a user to delete one of their posts
deleteMyPost(post: Posts) {
  return this.http.put('http://ec2-18-223-33-87.us-east-2.compute.amazonaws.com:8080/posts/delete', post);
}

// This method will create a new comment for a post
createComment(comment: Comments): Observable<Comments> {
  return this.http.post<Posts>('http://ec2-18-223-33-87.us-east-2.compute.amazonaws.com:8080/comments', comment);
}

// This method will be used by the admin to delete a comment
deleteComment(comment: Comments): Observable<Comments> {
  return this.http.put<Posts>('http://ec2-18-223-33-87.us-east-2.compute.amazonaws.com:8080/comments/delete', comment);
}

// This method will update a post
updatePost(post: Posts): Observable<Users> {
  return this.http.put<Users>('http://ec2-18-223-33-87.us-east-2.compute.amazonaws.com:8080/posts', post);
}
}
