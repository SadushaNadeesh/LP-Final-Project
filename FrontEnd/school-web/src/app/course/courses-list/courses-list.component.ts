import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/_services/course.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  course: any = {
    name: null,
    grade: null,
    marks: null
  };
  submitted = false;
  courseId = 1;

  closeResult = '';
  message = '';
  courses: any[]=[];
  currentCourse: any = null;
  currentIndex = -1;
  title = '';
  constructor(private courseService: CourseService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.retrieveCourses();
  }

  retrieveCourses(): void {
    this.courseService.getAll()
      .subscribe(
        data => {
          this.courses = data.course;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveCourses();
    this.currentCourse = null;
    this.currentIndex = -1;
  }
  getCourse(id: any): void {
    this.courseService.get(id)
      .subscribe(
        data => {
          this.currentCourse = data.data;
          console.log(this.currentCourse);
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
    this.getCourse(this.modalContent2.id);
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

  updateCourse(): void {
    console.log("update");
    this.courseService.update(this.currentCourse.id, this.currentCourse)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The course was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  newCourse(): void {
    this.submitted = false;
    this.course = {
      name: '',
      grade: '',
      marks: ''
    };
  }

}
