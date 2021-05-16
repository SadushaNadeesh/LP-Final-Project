import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/_services/content.service';

@Component({
  selector: 'app-contents-list',
  templateUrl: './contents-list.component.html',
  styleUrls: ['./contents-list.component.scss']
})
export class ContentsListComponent implements OnInit {

  contents: any[] =[] ;
  currentContent: any='';
  currentIndex = -1;
  title = '';

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.retrieveContents();
  }

  retrieveContents(): void {
    this.contentService.getAll()
      .subscribe(
        data => {
          this.contents = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveContents();
    this.currentContent = [];
    this.currentIndex = -1;
  }

  setActiveContent(data: any, index: number): void {
    this.currentContent = data;
    this.currentIndex = index;
    console.log("" + this.currentContent.id , "index number "+index);
  }

  removeAllContents(): void {
    this.contentService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.contentService.findByTitle(this.title)
      .subscribe(
        data => {
          this.contents = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
