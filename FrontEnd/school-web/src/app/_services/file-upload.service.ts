import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private endpoint = 'http://localhost:3001/api';

  constructor(private httpClient: HttpClient) { }

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('cover', file);

    const request = new HttpRequest('POST', `${this.endpoint}/upload-file`, formData, {
      // reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(request);
  }

  getFiles(): Observable<any> {
    return this.httpClient.get(`${this.endpoint}/files`);
  }
}
