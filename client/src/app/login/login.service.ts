import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Emp } from '../emp/emp.model';

const URL = 'http://192.168.0.18:8080/emps/';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }
  loginName :string; // 로그인시 세션name 저장, (회원정보수정버튼 이름)
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


