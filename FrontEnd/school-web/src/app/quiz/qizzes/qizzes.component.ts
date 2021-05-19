import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/_services/course.service';

@Component({
  selector: 'app-qizzes',
  templateUrl: './qizzes.component.html',
  styleUrls: ['./qizzes.component.scss']
})
export class QizzesComponent implements OnInit {
  courses: any;
  currentCourse: any = null;
  currentIndex = -1;
  title = '';

  constructor(private router: Router, private courseService: CourseService, private http: HttpClient) { }

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

  setActiveCourse(course: any, index:any): void {
    this.currentCourse = course;
    this.currentIndex = index;
  }

}