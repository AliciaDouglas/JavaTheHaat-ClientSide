import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/users';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  bAuthenticated = false;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    console.log(this.userService.currentUser.fname);

}
}
