import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/_services/question.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
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

  closeResult = '';
  message = '';
  questions: any[]=[];
  currentQuestion: any = null;
  currentIndex = -1;
  title = '';

  constructor(private questionService: QuestionService,  private modalService: NgbModal) { }

  ngOnInit(): void {
    this.retrieveQuestions();
  }

  retrieveQuestions(): void {
    this.questionService.getAll()
      .subscribe(
        data => {
          this.questions = data.questions;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveQuestions();
    this.currentQuestion = null;
    this.currentIndex = -1;
  }
  getQuestion(id: any): void {
    this.questionService.get(id)
      .subscribe(
        data => {
          this.currentQuestion = data.data;
          console.log(this.currentQuestion);
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
    this.getQuestion(this.modalContent2.id);
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

  updateQuestion(): void {
    console.log("update");
    this.questionService.update(this.currentQuestion.id, this.currentQuestion)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The question was updated successfully!';
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
