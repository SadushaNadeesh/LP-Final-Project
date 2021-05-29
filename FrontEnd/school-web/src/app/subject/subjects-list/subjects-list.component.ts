import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/_services/content.service';
import { SubjectService } from 'src/app/_services/subject.service';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.scss']
})
export class SubjectsListComponent implements OnInit {
  active = 'top';
  subjects: any[]=[];
  currentSubject: any = null;
  currentIndex = -1;
  title = '';

  contents: any[] =[] ;
  currentContent: any='';

  constructor(private subjectService: SubjectService, private contentService: ContentService) { }

  ngOnInit(): void {
    this.retrieveSubjects();
  }

  retrieveSubjects(): void {
    this.subjectService.getAll()
      .subscribe(
        data => {
          this.subjects = data.subject;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveSubjects();
    this.currentSubject = null;
    this.currentIndex = -1;
  }

  setActiveTopic(subjectId: number, index: number): void {
    //console.log(tutorial);
    this.retrieveContents(subjectId);
  }

  retrieveContents(subjectId: number): void {
    this.subjectService.getSubjectContentsById(subjectId)
      .subscribe(
        data => {
          this.contents = data.content.contents;
          console.log(this.contents);
        },
        error => {
          console.log(error);
        });
  }


  searchTitle(): void {
    this.subjectService.findByTitle(this.title)
      .subscribe(
        data => {
          this.subjects = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
