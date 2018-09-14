import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Users } from '../models/users';
import { Posts } from '../models/posts';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


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
  return this.http.get<Posts[]>('http://ec2-18-223-33-87.us-east-2.compute.amazonaws.com:8080/posts/' + uId);
}

// This method gets all posts of a specific category
getAllPostsByCategory(categoryId: number): Observable<Posts[]> {
  return this.http.get<Posts[]>('http://ec2-18-223-33-87.us-east-2.compute.amazonaws.com:8080/posts/category/' + categoryId);
}

// This method will make a post (send it to DB for persistance)
createAPost(post: Posts): Observable<Posts> {
  return this.http.post<Posts>('http://ec2-18-223-33-87.us-east-2.compute.amazonaws.com:8080/posts', Posts);
}

// This method will allow a user to delete one of their posts
deleteMyPost(post: Posts): Observable<Posts> {
  return this.http.delete<Posts>('http://ec2-18-223-33-87.us-east-2.compute.amazonaws.com:8080/posts');
}

}
