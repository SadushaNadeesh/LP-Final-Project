import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  user = {
    name: '',
    email: '',
    password: '',
  };

  closeResult = '';
  message = '';
  users: any[] = [];
  currentUser: any = '';
  currentIndex = -1;
  title = '';
  submitted = false;

  constructor(private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  saveUser(): void {
    const data = {
      name: this.user.name,
      email: this.user.email,
      password: this.user.password
    }

    this.authService.register(data.name, data.email, data.password)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
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

  modalContent: any;
  open(content: any, modalContent: any) {
    this.modalContent = modalContent;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  modalContent2: any;
  open2(content2: any, modalContent2: any) {
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

  updateStatus(status: any): void {
    const data = {
      name: this.currentUser.name,
      email: this.currentUser.email,
      roles: status
    };

    this.authService.update(this.currentUser.id, data)
      .subscribe(
        response => {
          this.currentUser.roles = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateUser(): void {
    console.log("update");
    this.authService.update(this.currentUser.id, this.currentUser)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The user was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteUser(): void {
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
  newUser(): void {
    this.submitted = false;
    this.user = {
      name: '',
      email: '',
      password: ''
    };
  }

}
