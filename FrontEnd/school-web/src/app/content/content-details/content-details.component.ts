import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from 'src/app/_services/content.service';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss']
})
export class ContentDetailsComponent implements OnInit {

  currentContent: any = '';
  message = '';

  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getContent(this.route.snapshot.paramMap.get('id'));
  }

  getContent(id: any): void {
    this.contentService.get(id)
      .subscribe(
        data => {
          this.currentContent = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status: any): void {
    const data = {
      name: this.currentContent.name,
      description: this.currentContent.description,
      published: status
    };

    this.contentService.update(this.currentContent.id, data)
      .subscribe(
        response => {
          this.currentContent.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateContent(): void {
    this.contentService.update(this.currentContent.id, this.currentContent)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The content was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteContent(): void {
    this.contentService.delete(this.currentContent.id)
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
