import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from 'src/app/_services/test.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  currentUser: any;

  constructor(public quizService: TestService, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.quizService.getCourseQuestionsById(1).subscribe(
      (data: any) => {
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
        console.log(this.quizService.correctAnswerCount);

      }
    );
  }

  OnSubmit() {
    // this.quizService.submitScore().subscribe(() => {
    // });
  }

}
