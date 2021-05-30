import { HttpClient, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private endpoint = 'http://localhost:3001/api/post';

  constructor(private httpClient: HttpClient) { }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('cover', file);

    // const request = new HttpRequest('POST', `${this.endpoint}/${id}/cover`, formData, {
    //   //reportProgress: true,
    //   responseType: 'json'
    // });

      //return this.httpClient.post(request);
    const res = this.httpClient.post(`${this.endpoint}/cover`, formData);
    return res;


  }

  getFiles(): Observable<any> {
    return this.httpClient.get(`${this.endpoint}/files`);
  }
}
