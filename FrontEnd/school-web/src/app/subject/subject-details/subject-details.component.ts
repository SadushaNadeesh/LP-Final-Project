import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubjectService } from 'src/app/_services/subject.service';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.scss']
})
export class SubjectDetailsComponent implements OnInit {
  subject = {
    name: '',
    grade: '',
    description: ''
  };
  submitted = false;
  subjectId = 1;

  closeResult = '';
  message = '';
  subjects: any[]=[];
  currentSubject: any = null;
  currentIndex = -1;
  title = '';
  constructor(private subjectService: SubjectService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.retrieveCourses();
  }

  retrieveCourses(): void {
    this.subjectService.getAll()
      .subscribe(
        data => {
          this.subjects = data.subject;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveCourses();
    this.currentSubject = null;
    this.currentIndex = -1;
  }
  getSubject(id: any): void {
    this.subjectService.get(id)
      .subscribe(
        data => {
          this.currentSubject = data;
          console.log(this.currentSubject);
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
    this.getSubject(this.modalContent2.id);
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

  updateSubject(): void {
    console.log("update");
    this.subjectService.update(this.currentSubject.id, this.currentSubject)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The subject was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  newSubject(): void {
    this.submitted = false;
    this.subject = {
      name: '',
      description: '',
      grade: ''
    };
  }

}
