import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/_services/blog.service';
import { FileUploadService } from 'src/app/_services/file-upload.service';
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

  existingFile: any;

  submitted = false;
  teacher_id = '';
  isLoggedIn = false;
  user_id: number = 2;
  status = 'PENDING'
  cr_date: any = new Date();
  fileToUpload: any ;

  constructor(private blogService: BlogService, private tokenStorage: TokenStorageService, private fileUpload: FileUploadService) {
    //this.cr_date = this.datePipe.transform(this.cr_date, 'yyyy-MM-dd');
   }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      console.log(" Token login component token:  "+this.tokenStorage.getToken);
      this.isLoggedIn = true;
      //this.user_id = this.tokenStorage.getUser().id;
    }
  }

  chooseFile(event: any): void {
    this.existingFile = event.target.files[0];
    console.log(this.existingFile);

    this.fileUpload.uploadFile(this.existingFile).subscribe( (event) => {
             if (event instanceof HttpResponse) {
              // this.msg = event.body.message;
              //this.FileDetail = this.fileUpload.getFiles();
              console.log(event);
            }
          }, (error) => {
            // this.msg = 'Error occured while uploading file';
            console.log(error);
            this.existingFile = undefined;
          });
    

  }

  // upload(): void {
  //   // this.progress = 0;
  
  //   this.existingFile = this.chosenFiles.item(0);

  //   this.uploadService.uploadFile(this.existingFile).subscribe( (event) => {
  //       if (event.type === HttpEventType.UploadProgress) {
  //         this.progress = Math.round(100 * event.loaded / event.total);
  //       } else if (event instanceof HttpResponse) {
  //         this.msg = event.body.message;
  //         this.FileDetail = this.uploadService.getFiles();
  //       }
  //     }, (error) => {
  //       this.progress = 0;
  //       this.msg = 'Error occured while uploading file';
  //       this.existingFile = undefined;
  //     });

  //   this.chosenFiles = undefined;
  // } 

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

    
    console.log(typeof this.post.cover);

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
