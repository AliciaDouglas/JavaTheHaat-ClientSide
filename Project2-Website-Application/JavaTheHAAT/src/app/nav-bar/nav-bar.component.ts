import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

search: String;

  constructor(private router: Router) { }

  ngOnInit() {
  }

searchString() {
  this.router.navigate(['search/', this.search]);
}

}
