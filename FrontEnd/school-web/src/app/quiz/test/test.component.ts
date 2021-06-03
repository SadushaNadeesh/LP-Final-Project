import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/_services/course.service';
import { TestService } from 'src/app/_services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  currentCourse = false;
  courseId: any;
  message = '';

  constructor(private route: ActivatedRoute,
    private router: Router, public quizService: TestService, private http: HttpClient) { }

  ngOnInit(): void {

    this.message = '';
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.getCourse(this.route.snapshot.paramMap.get('id'));

  }

  getCourse(id: any): void {
    this.quizService.seconds = 0;
    this.quizService.qnProgress = 0;
    this.quizService.getCourseQuestionsById(id).subscribe(
      (data: any) => {
        this.quizService.qns = data.Qns;
        if (this.quizService.qns.length > 0) {
          this.currentCourse = true;
        }
        console.log(this.quizService.qns.length);
        //console.log(this.quizService.qns);
        this.startTimer();

      },
      error => {
        console.log(error);
      }
    );
  }


  startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
      localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 1000);
  }

  Answer(qID: any, choice: any) {
    this.quizService.qns[this.quizService.qnProgress].selectedAnswer = choice;
    //console.log("=================> "+this.quizService.qnProgress);
    this.quizService.qnProgress++;
    if (this.quizService.qnProgress == this.quizService.qns.length) {
      clearInterval(this.quizService.timer);
      this.router.navigate([`/result/${this.courseId}`]);
    }
  }

}
