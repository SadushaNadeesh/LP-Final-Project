import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from 'src/app/_services/test.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(public quizService: TestService, private router: Router) { }

  ngOnInit(): void {
      this.quizService.getAnswers(1).subscribe(
        (data: any) => {
          //console.log(data);
          this.quizService.correctAnswerCount = 0;
          this.quizService.qns.forEach((e:any, i:any) => {
            if (e.answer == data[i])
              this.quizService.correctAnswerCount++;
            e.correct = data[i];
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
