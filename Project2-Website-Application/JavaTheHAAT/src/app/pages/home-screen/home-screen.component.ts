import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/users';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {
 
  bAuthenticated = false;

  constructor() { }

  ngOnInit() {


}
}
