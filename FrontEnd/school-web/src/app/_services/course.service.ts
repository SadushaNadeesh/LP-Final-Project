import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'http://localhost:3002/api/courseQuestions';
const baseUrl = 'http://localhost:3002/api/course';
const baseUrl1 = 'http://localhost:3002/api/courses';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  createCourse(teacher_id: any, name: string, grade: string, marks: number, status: string): Observable<any> {
    return this.http.post(baseUrl , {
      teacher_id,
      name,
      grade,
      marks,
      status
    }, httpOptions);
  }

  // readCourse(name: string, email: string, password: string): Observable<any> {
  //   return this.http.post(AUTH_API + 'course', {
  //     name,
  //     email,
  //     password
  //   }, httpOptions);
  // }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  getCourseQuestionsById(id: any): Observable<any>{
    return this.http.get(`${apiUrl}/${id}`);
  }

  getAll(): Observable<any> {
    return this.http.get(baseUrl1);
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

  findByTitle(title: any): Observable<any> {
    return this.http.get(`${baseUrl}?title=${title}`);
  }

}
