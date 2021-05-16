import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/_services/subject.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {

  subject = {
    name: '',
    grade: '',
    description: ''
  };
  submitted = false;
  status = 'PENDING'
  cr_date: any = new Date();
  isLoggedIn = false;
  user_id = '';

  constructor(private subjectService: SubjectService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      console.log(" Token login component token:  "+this.tokenStorage.getToken);
      this.isLoggedIn = true;
      this.user_id = this.tokenStorage.getUser().id;
    }
  }

  saveSubject(): void {
    const data = {
      teacher_id: this.user_id,
      name: this.subject.name,
      grade: this.subject.grade,
      description: this.subject.description,
      status: this.status

    };

    this.subjectService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newSubject(): void {
    this.submitted = false;
    this.subject = {
      name: '',
      description: '',
      grade: ''
    };
  }

}
