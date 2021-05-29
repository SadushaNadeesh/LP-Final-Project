import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogService } from 'src/app/_services/blog.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  post = {
    name: '',
    content: '',
    cover: ''
  };
  submitted = false;
  currentPost: any = null;
  closeResult = '';
  message = '';
  posts: any[]=[];
  user_id: number = 2;
  status = 'PENDING'
  cr_date: any = new Date();
  fileToUpload: any ;

  constructor(private blogService: BlogService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.retrievePost();
  }
  retrievePost(): void {
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

  modalContent: any;
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  modalContent2: any;
  open2(content2: any, modalContent2: any) {
    this.modalContent2 = modalContent2;
    this.getPost(this.modalContent2.id);
    this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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

  newTutorial(): void {
    this.submitted = false;
    this.post = {
      name: '',
      content: '',
      cover:''
    };
  }

}
