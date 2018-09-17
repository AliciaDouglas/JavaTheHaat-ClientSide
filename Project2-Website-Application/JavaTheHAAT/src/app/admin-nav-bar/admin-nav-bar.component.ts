import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { SearchPageComponent } from '../pages/search-page/search-page.component';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent implements OnInit {

  search: string;

  constructor(private router: Router, private childComponent: SearchPageComponent, private userService: UsersService) { }

  ngOnInit() {
  }

logout() {
  this.userService.currentUser.accTypeId = 0;
  this.router.navigate(['/login']);
}

  // redirects the searchQuery to the search component html parameter of the URL
  searchString() {
    this.router.navigate(['search/' + this.search]);
    this.childComponent.searchFor = this.search;
    this.childComponent.ngOnInit();
    this.childComponent.searchFor = this.search;
  }

}
