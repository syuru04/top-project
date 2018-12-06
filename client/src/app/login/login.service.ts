import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Emp } from '../emp/emp.model';

const URL = 'http://localhost:8080/emps/';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
<<<<<<< HEAD
  constructor(private http: HttpClient) { }
=======
  constructor(private http: HttpClient) { }  
>>>>>>> 0d903f0f2b7e5eb31863f6fc90ef43f4fd4f217b
  
  //로그인시 아이디,비밀번호 체크
  pwChk(id:string, pw:string): Observable<any> {
    return this.http.post<Boolean>(URL+'pw', [id, pw], HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('pwChk'))
    );
  }

  //로그인시 아이디,비번체크 완료후 로그인정보 불러오기
  getEmp(id:string): Observable<Emp> {
    return this.http.post<Emp>(URL+'c/', id, HTTP_OPTIONS);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}


