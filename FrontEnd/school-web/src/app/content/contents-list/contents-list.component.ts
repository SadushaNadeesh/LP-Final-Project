import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentService } from 'src/app/_services/content.service';

@Component({
  selector: 'app-contents-list',
  templateUrl: './contents-list.component.html',
  styleUrls: ['./contents-list.component.scss']
})
export class ContentsListComponent implements OnInit {
  content = {
    name: '',
    description: '',
    content: '',
    materials: '',
    reference: '',
  };
  closeResult = '';
  message = '';
  submitted = false;
  contents: any[] =[] ;
  currentContent: any='';
  currentIndex = -1;
  title = '';

  constructor(private contentService: ContentService,  private modalService: NgbModal) { }

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
  getContent(id: any): void {
    this.contentService.get(id)
      .subscribe(
        data => {
          this.currentContent = data;
          console.log(this.currentContent);
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
    this.getContent(this.modalContent2.id);
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

  setActiveContent(data: any, index: number): void {
    this.currentContent = data;
    this.currentIndex = index;
    console.log("" + this.currentContent.id , "index number "+index);
  }

  updateContent(): void {
    console.log("update");
    this.contentService.update(this.currentContent.id, this.currentContent)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The constent was updated successfully!';
        },
        error => {
          console.log(error);
        });
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
