import { Component, OnInit } from '@angular/core';
import { Posts } from '../../models/posts';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
  selector: 'app-video-info',
  templateUrl: './video-info.component.html',
  styleUrls: ['./video-info.component.css']
})
export class VideoInfoComponent implements OnInit {

  currentPost: Posts;

  constructor(private userService: UsersService, private safePipe: SafePipe, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userService.getAllPostsByPid(+this.route.snapshot.paramMap.get('id')).subscribe((post) => {
      this.currentPost = post;
    });

  }

}
