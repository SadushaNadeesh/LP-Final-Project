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

  qns: any;
  option: any[]=[];
  seconds: number=0;
  timer: any;
  qnProgress: number =0;
  correctAnswerCount: number = 0;

  constructor(private router: Router, private quizService: CourseService, private http: HttpClient) { }

  ngOnInit(): void {
      this.seconds = 0;
      this.qnProgress = 0;
      this.quizService.getCourseQuestionsById(1).subscribe(
        (option: any) => {
          this.qns = option.Qns;
          this.option = option.Qns;
          this.startTimer();
          console.log(this.option);
        }
      );

  }


  startTimer() {
    this.timer = setInterval(() => {
      this.seconds++;
      localStorage.setItem('seconds', this.seconds.toString());
    }, 1000);
  }

  displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }


  Answer(qID: any, choice: any) {
    this.qns[this.qnProgress].answer = choice;
    this.qnProgress++;
    if (this.qnProgress == this.qns.length) {
      clearInterval(this.timer);
      this.router.navigate(['/result']);
    }
  }

}
