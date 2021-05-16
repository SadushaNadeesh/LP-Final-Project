import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/_services/course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {

  currentCourse: any;
  message = '';
  

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getCourse(this.route.snapshot.paramMap.get('id'));
  }

  getCourse(id:any): void {
    this.courseService.get(id)
      .subscribe(
        data => {
          this.currentCourse = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status: any): void {
    const data = {
      name: this.currentCourse.name,
      grade: this.currentCourse.grade,
      published: status
    };

    this.courseService.update(this.currentCourse.id, data)
      .subscribe(
        response => {
          this.currentCourse.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateTutorial(): void {
    this.courseService.update(this.currentCourse.id, this.currentCourse)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The tutorial was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteTutorial(): void {
    this.courseService.delete(this.currentCourse.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/tutorials']);
        },
        error => {
          console.log(error);
        });
  }

}
