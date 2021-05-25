import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  closeResult = '';
  message = '';
  users: any[] = [];
  currentUser: any = '';
  currentIndex = -1;
  title = '';

  constructor(private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.authService.getAll()
      .subscribe(
        data => {
          this.users = data.users;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = [];
    this.currentIndex = -1;
  }

  setActiveUser(data: any, index: number): void {
    this.currentUser = data;
    this.currentIndex = index;
    console.log("" + this.currentUser.id, "index number " + index);
  }

  // removeAllContents(): void {
  //   this.authService.deleteAll()
  //     .subscribe(
  //       response => {
  //         console.log(response);
  //         this.refreshList();
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

  // searchTitle(): void {
  //   this.authService.findByTitle(this.title)
  //     .subscribe(
  //       data => {
  //         this.contents = data;
  //         console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }
  modalContent:any;
  open(content: any, modalContent:any) {
    this.modalContent = modalContent;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  modalContent2:any;
  open2(content2: any, modalContent2:any) {
    this.modalContent2 = modalContent2;
    this.getContent(this.modalContent2.id);
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

  getContent(id: any): void {
    this.authService.get(id)
      .subscribe(
        data => {
          this.currentUser = data.data;
          console.log(this.currentUser);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status: any): void {
    const data = {
      name: this.currentUser.name,
      description: this.currentUser.description,
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
    console.log("update");
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
    console.log("delete");
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
