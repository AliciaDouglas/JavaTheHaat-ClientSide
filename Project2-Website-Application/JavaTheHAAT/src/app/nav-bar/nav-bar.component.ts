import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchPageComponent } from '../pages/search-page/search-page.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

search: string;

  constructor(private router: Router, private childComponent: SearchPageComponent) { }

  ngOnInit() {
  }

searchString() {
  this.router.navigate(['search/' + this.search]);
  this.childComponent.searchFor = this.search;
  this.childComponent.ngOnInit();
  this.childComponent.searchFor = this.search;
}

}
