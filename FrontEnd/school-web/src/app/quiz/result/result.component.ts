import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultService } from 'src/app/_services/result.service';
import { TestService } from 'src/app/_services/test.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  currentUser: any;
  marks: any;
  courseId: any;
  submitted = false;
  errorMessage = '';
  status: string = 'completed';
  grade: any;


  constructor(public quizService: TestService, private route: ActivatedRoute,
    private router: Router, private tokenStorage: TokenStorageService, private resultService: ResultService) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');

    this.currentUser = this.tokenStorage.getUser();
    this.quizService.getCourseQuestionsById(this.courseId).subscribe(
      (data: any) => {
        this.grade = 11;
        console.log(data.Qns);
        this.quizService.correctAnswerCount = 0;
        this.quizService.qns.forEach((e: any, i: any) => {
          console.log("i: " + i);
          console.log("e: " + e.selectedAnswer);
          console.log("Data answer " + e.selectedAnswer + " correct answer: " + data.Qns[i].answer);
          if (e.selectedAnswer == data.Qns[i].answer)
            this.quizService.correctAnswerCount++;
          e.correct = data.Qns[i];
        });
        this.marks = this.quizService.correctAnswerCount;
        console.log(this.quizService.correctAnswerCount);

      }
    );
  }

  OnSubmit() {
    this.resultService.create(this.currentUser.id, this.courseId, this.grade, this.marks, this.status).subscribe(
      data => {
        console.log(data.result);
        this.submitted = true;
      },
      err => {
        console.log();
        this.errorMessage = err.error.message;
      }
    );
  }

  Portal(){
    this.router.navigate(['/user']);
  }

}
