import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/_services/course.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  course: any = {
    name: null,
    grade: null,
    marks: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  teacher_id = '';
  status = 'ACTIVE';
  submitted = false;

  constructor(private tokenStorage: TokenStorageService, private courseService: CourseService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      console.log(" Token login component token:  " + this.tokenStorage.getToken);
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.teacher_id = this.tokenStorage.getUser().id;
    }
  }

  saveCourse(): void {
    const { name, grade, marks } = this.course;

    this.courseService.createCourse(this.teacher_id, name, grade, marks, this.status).subscribe(
      data => {
        console.log(data);
        this.submitted = true;
      },
      err => {
        console.log(name + " " + grade + " " + marks);
        this.errorMessage = err.error.message;
      }
    );
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
