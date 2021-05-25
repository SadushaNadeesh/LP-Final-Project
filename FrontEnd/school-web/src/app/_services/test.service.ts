import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const apiUrl = 'http://localhost:3002/api/courseQuestions';
const apiUrl2 = 'http://localhost:3002/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TestService {

  qns: any[]=[];
  qa: any[]=[];
  seconds: number=0;
  timer: any;
  qnProgress: number=0;
  correctAnswerCount: number = 0;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  getCourseQuestionsById(id: any): Observable<any>{
    return this.http.get(`${apiUrl}/${id}`);
  }

  displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }

  getParticipantName() {
    var participant = this.tokenStorage.getUser().name;
    return participant;
  }

  getAnswers(id: any) {
    var body = this.qns.map(x => x.QnID);
    return this.http.get(`${apiUrl}/${id}`);
  }

  submitScore() {

  }


}
