import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/_services/content.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.scss']
})
export class AddContentComponent implements OnInit {

  content = {
    name: '',
    description: '',
    content: '',
    materials: '',
    reference: '',
  };
  submitted = false;
  teacher_id = '';
  isLoggedIn = false;
  user_id = '';
  status = 'PENDING';
  subjectId: number = 2;

  constructor(private contentService: ContentService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      console.log(" Token login component token:  "+this.tokenStorage.getToken);
      this.isLoggedIn = true;
    }
  }

  saveContent(): void {
    const data = {
      name: this.content.name,
      description: this.content.description,
      content: this.content.content,
      materials: this.content.materials,
      reference: this.content.reference,
      subjectId: this.subjectId
    };

    this.contentService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newContent(): void {
    this.submitted = false;
    this.content = {
      name: '',
      description: '',
      content: '',
      materials: '',
      reference: ''
    };
  }

}
