import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3002/api/';

@Injectable({
  providedIn: 'root'
})

export class ResultService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}result/${id}`);
  }

  create(student_id:number, courseId:number, grade:number, marks:number, status:string): Observable<any> {
    return this.http.post(baseUrl+'addresult', {
      student_id,
      courseId,
      grade,
      marks,
      status
    });
  }

  update(id: any, data: any): Observable<any> {
    return this.http.patch(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(name: any): Observable<any> {
    return this.http.get(`${baseUrl}?name=${name}`);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${baseUrl}/files`);
  }
}
