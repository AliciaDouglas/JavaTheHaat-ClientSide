import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Users } from '../models/users';
import { Posts } from '../models/posts';


const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user: BehaviorSubject<Users> = new BehaviorSubject<Users>(null);

  currentUser: Users;

  // static registerUser(Users: typeof Users): any {
  //   throw new Error("Method not implemented.");
  // }

  constructor(private http: HttpClient) { }



// This method registers/creates a user in the database
registerUser(user: Users): Observable<Users> {
  return this.http.post<Users>('http://ec2-18-223-33-87.us-east-2.compute.amazonaws.com:8080/users', user );
}

// This method will get a specific user by Email and password for user authentication in DB
getUserByEmailAndPassword(inputUser: Users): Observable<Users> {
  return this.http.post<Users>('http://ec2-18-223-33-87.us-east-2.compute.amazonaws.com:8080/login/', inputUser);
}

// This method will get a specific user by Id
getUserById(uId: number): Observable<Users> {
  return this.http.get<Users>('http://localhost:3000/users?uId=' + uId );
}

// This method will update a user's profile info
updateUserInfo(user: Users): Observable<Users> {
  return this.http.put<Users>('http://localhost:3000/users', user, HTTP_OPTIONS);
}

// This method gets all posts
getAllPosts(): Observable<Posts[]> {
  return this.http.get<Posts[]>('http://localhost:3000/posts', HTTP_OPTIONS);
}

// This method will get all of a specific user's posts
getAllPostsByUser(uId: number): Observable<Posts[]> {
  return this.http.get<Posts[]>('http://localhost:3000/posts?uId=' + uId, HTTP_OPTIONS);
}

// This method gets all posts of a specific category
getAllPostsByCategory(categoryId: number): Observable<Posts[]> {
  return this.http.get<Posts[]>('http://localhost:3000/posts?categoryId=' + categoryId, HTTP_OPTIONS);
}

// This method will make a post (send it to DB for persistance)
createAPost(post: Posts): Observable<Posts> {
  return this.http.post<Posts>('http://localhost:3000/posts', post, HTTP_OPTIONS);
}

// This method will allow a user to delete one of their posts
deleteMyPost(uId: number, pId: number): Observable<Posts> {
  return this.http.delete<Posts>('http://localhost:3000/posts?uId=1&pId=1', HTTP_OPTIONS);
}

}
