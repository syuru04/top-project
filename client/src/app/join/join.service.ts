import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Emp } from '../emp/emp.model';

const URL = 'http://' + window.location.hostname + ':8080/emps/';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class JoinService {
  constructor(private http: HttpClient) { }

  //회원가입에서 등록버튼 클릭시
  add(emp: Emp): Observable<Emp> {
    return this.http.post<Emp>(URL, emp, HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('add'))
    );
  }

  //회원정보수정에서 등록버튼 클릭시
  update(emp: Emp): Observable<Emp> {
    return this.http.put<Emp>(URL, emp, HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('update'))
    );
  }

  //회원가입에서 아이디중복확인 클릭시
  codeChk(code:string):Observable<any>{
    return this.http.post<any>(URL+'j/',code,HTTP_OPTIONS);
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
