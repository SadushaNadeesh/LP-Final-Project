import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/_services/blog.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  currentPost: any = null;
  message = '';

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getPost(this.route.snapshot.paramMap.get('id'));
  }

  getPost(id:any): void {
    this.blogService.get(id)
      .subscribe(
        data => {
          this.currentPost = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status: any): void {
    const data = {
      title: this.currentPost.title,
      description: this.currentPost.description,
      status: status
    };

    this.blogService.update(this.currentPost.id, data)
      .subscribe(
        response => {
          this.currentPost.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updatePost(): void {
    this.blogService.update(this.currentPost.id, this.currentPost)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The post was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deletePost(): void {
    this.blogService.delete(this.currentPost.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/posts']);
        },
        error => {
          console.log(error);
        });
  }

}
