import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/_services/blog.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  post = {
    name: '',
    content: '',
    cover: ''
  };
  submitted = false;
  teacher_id = '';
  isLoggedIn = false;
  user_id: number = 2;
  status = 'PENDING'
  cr_date: any = new Date();
  fileToUpload: any ;

  constructor(private blogService: BlogService, private tokenStorage: TokenStorageService) {
    //this.cr_date = this.datePipe.transform(this.cr_date, 'yyyy-MM-dd');
   }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      console.log(" Token login component token:  "+this.tokenStorage.getToken);
      this.isLoggedIn = true;
      //this.user_id = this.tokenStorage.getUser().id;
    }
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    // reader.onload = (event:any) => {
    //   this.imageUrl = event.target.result;
    // }
    reader.readAsDataURL(this.fileToUpload);
  }

  saveTutorial(): void {
    const data = {
      name: this.post.name,
      content: this.post.content,
      cover: this.post.cover,
      status: this.status,
      teacher_id: this.user_id,
      date: this.cr_date
    };

    this.blogService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newTutorial(): void {
    this.submitted = false;
    this.post = {
      name: '',
      content: '',
      cover:''
    };
  }

}
