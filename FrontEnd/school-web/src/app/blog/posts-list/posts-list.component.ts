import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/_services/blog.service';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  providers: [NgbPaginationConfig]
})
export class PostsListComponent implements OnInit {

  posts: any;
  currentPost: any = 'null';
  currentIndex = -1;
  title = '';

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.retrieveBlogs();
  }

  retrieveBlogs(): void {
    this.blogService.getAll()
      .subscribe(
        data => {
          this.posts = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveBlogs();
    this.currentPost = null;
    this.currentIndex = -1;
  }

  setActivePost(tutorial: any, index: any): void {
    this.currentPost = tutorial;
    this.currentIndex = index;
  }

  removeAllPosts(): void {
    this.blogService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.blogService.findByTitle(this.title)
      .subscribe(
        data => {
          this.posts = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
