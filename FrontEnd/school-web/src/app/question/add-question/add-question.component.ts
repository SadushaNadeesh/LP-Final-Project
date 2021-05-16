import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  question = {
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    marks: ''
  };
  submitted = false;
  courseId = 1;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
  }

  saveQuestion(): void {
    const data = {
      question: this.question.question,
      option1: this.question.option1,
      option2: this.question.option2,
      option3: this.question.option3,
      option4: this.question.option4,
      answer: this.question.answer,
      marks: this.question.marks,
      courseId: this.courseId
    };

    this.questionService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newQuestion(): void {
    this.submitted = false;
    this.question = {
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: '',
      marks: ''
    };
  }

}
