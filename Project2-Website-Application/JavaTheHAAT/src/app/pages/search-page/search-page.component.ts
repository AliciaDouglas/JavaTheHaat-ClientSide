import { Comments } from './../../models/comments';
import { Component, OnInit } from '@angular/core';
import { Posts } from '../../models/posts';
import { Users } from '../../models/users';
import { HttpClient } from 'selenium-webdriver/http';
import { UsersService } from '../../services/users.service';
import { SafePipe } from '../../pipes/safe.pipe';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  posts: Posts[];
  bAuthenticated = false;
  currentUser: Users;
  isAdmin = true;
  viewer: boolean;
  searchFor: string;

  constructor(private route: ActivatedRoute, private userService: UsersService, private safePipe: SafePipe, private router: Router) { }

  ngOnInit() {
    this.posts = [
      {
      pId: -200,
      uId: 21,
      user: {},
      steps: [],
      comments: []
     }
    ];
    this.currentUser = this.userService.currentUser;
    if (this.currentUser.accTypeId !== 2) {
      this.isAdmin = false;
    } if (this.currentUser.accTypeId === 0) {
      this.viewer = true;
    }
    this.searchFor = this.route.snapshot.paramMap.get('string');
    console.log('searching: ' + this.searchFor);
    this.searchForPosts(this.route.snapshot.paramMap.get('string'));
    for (let i = 0; i < this.posts.length; i++) {
      this.posts[i].video = this.safePipe.transform(this.posts[i].video);
    }
  }

    // When they click on a post they are redirected to the single-post view
    viewPost(pId: number) {
      this.router.navigate(['video-info/' + pId]);
    }

    searchForPosts(searchQuery: string) {
      this.userService.getAllPosts().subscribe((posts) => {
        for (let i = 0; i < posts.length; i++) {
          const description = posts[i].description;
          const title = posts[i].title;
          if (description.search(searchQuery) > -1 || title.search(searchQuery) > -1) {
            let postIndex = 0;
            console.log(posts[i].description);
            console.log(posts[i].title);
            this.posts[postIndex] = posts[i];
            postIndex++;
          }
              for (let j = 0; j < posts[i].steps.length; j++) {
                const stepText =  posts[i].steps[j].stepText;
                const stepName =  posts[i].steps[j].stepName;
                if (stepText.search(searchQuery) > -1 || stepName.search(searchQuery) > -1) {
                  if (this.posts[0].pId !== -200) {
                    this.posts.push(posts[i]);
                  } else {
                  let postIndex = 0;
                  this.posts[postIndex] = posts[i];
                  postIndex++;
                }
                }
              }
                    for (let k = 0; k < posts[i].comments.length; k++) {
                      const commentText =  posts[i].comments[k].commentText;
                      if (commentText.search(searchQuery) > -1) {
                        if (this.posts[0].pId !== -200) {
                          this.posts.push(posts[i]);
                        } else {
                        let postIndex = 0;
                        this.posts[postIndex] = posts[i];
                        postIndex++;
                      }
                      }
                    }
                          const userFname =  posts[i].user.fname;
                          const userLname =  posts[i].user.lname;
                          const userUsername =  posts[i].user.username;
                          if (userFname.search(searchQuery) > -1 || userLname.search(searchQuery) > -1
                          ||  userUsername.search(searchQuery) > -1) {
                             if (this.posts[0].pId !== -200) {
                                  this.posts.push(posts[i]);
                                } else {
                                let postIndex = 0;
                                this.posts[postIndex] = posts[i];
                                postIndex++;
                              }
                              }
      } if (this.posts[0].pId === -200) {this.posts = null; }

      });
    }
}
