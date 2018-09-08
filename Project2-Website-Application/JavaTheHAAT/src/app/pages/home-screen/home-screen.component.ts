import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../service/authorization.service';
import { Http, Headers } from '@angular/http';
@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  bAuthenticated = false;

  constructor(private http: Http, private auth: AuthorizationService) { }

  ngOnInit() {
    const authenticatedUser = this.auth.getAuthenticatedUser();
    if (authenticatedUser == null) {
      return;
  }
  this.bAuthenticated = true;
}
}
