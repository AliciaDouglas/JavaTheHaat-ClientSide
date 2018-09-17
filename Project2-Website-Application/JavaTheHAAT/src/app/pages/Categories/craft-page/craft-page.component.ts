import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/models/posts';
import { UsersService } from 'src/app/services/users.service';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-craft-page',
  templateUrl: './craft-page.component.html',
  styleUrls: ['./craft-page.component.css']
})
export class CraftPageComponent implements OnInit {
  posts: Posts[];

  constructor(private router: Router, private userService: UsersService, private safePipe: SafePipe) { }

  ngOnInit() {
    this.getAllPostsByCategory();
    for (let i = 0; i < this.posts.length; i++) {
      this.posts[i].video = this.safePipe.transform(this.posts[i].video);
    }
  }

  // This method will get all posts... It should be changed to getAllPostsByUid, so a user can only see their posts
  getAllPostsByCategory() {
    this.userService.getAllPostsByCategory(1).subscribe(result => {
      console.log('This is the JSON title of first:' + result[0].title);
      this.posts = result;
    });
  }

  // When they click on a post they are redirected to the single-post view
  viewPost(pId: number) {
    this.router.navigate(['video-info/' + pId]);
  }
}
