import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  currentContent: any = '';
  message = '';

  constructor(
    private modalService: NgbModal,
    private contentService: AuthService,
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
          this.currentContent = data.data;
          console.log(this.currentContent);
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

    // this.contentService.update(this.currentContent.id, data)
    //   .subscribe(
    //     response => {
    //       this.currentContent.published = status;
    //       console.log(response);
    //     },
    //     error => {
    //       console.log(error);
    //     });
  }

  updateContent(): void {
    // this.contentService.update(this.currentContent.id, this.currentContent)
    //   .subscribe(
    //     response => {
    //       console.log(response);
    //       this.message = 'The content was updated successfully!';
    //     },
    //     error => {
    //       console.log(error);
    //     });
  }

  deleteContent(): void {
    // this.contentService.delete(this.currentContent.id)
    //   .subscribe(
    //     response => {
    //       console.log(response);
    //       this.router.navigate(['/posts']);
    //     },
    //     error => {
    //       console.log(error);
    //     });
  }

}
