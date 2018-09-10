import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/users';
import { Posts } from '../models/posts';
import { UsersService } from './users.service';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private userService: UsersService) { }


// This method get all registered users
getAllUsers(): Observable<Users[]> {
  return this.http.get<Users[]>('http://localhost:3000/users', HTTP_OPTIONS);
}

}
