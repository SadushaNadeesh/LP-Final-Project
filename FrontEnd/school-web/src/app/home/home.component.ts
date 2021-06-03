import { Component, OnInit } from '@angular/core';
import { BlogService } from '../_services/blog.service';
import { ResultService } from '../_services/result.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: any[] = [];
  lastPosts: any[] = [];
  currentPost: any = null;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.retrievePosts();
  }

  retrievePosts(): void {
    this.blogService.getAll()
      .subscribe(
        data => {
          this.posts = data;
          //console.log(data);
          this.lastPost();
        },
        error => {
          console.log(error);
        });
  }

  lastPost() {
    this.lastPosts = this.posts.slice(this.posts.length - 3, this.posts.length);
    console.log(this.lastPosts);
  }



}
