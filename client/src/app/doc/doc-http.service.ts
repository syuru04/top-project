import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Doc } from './model/doc.model';

const URL = 'http://localhost:8080/docs/';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class DocHttpService {

  constructor(private http: HttpClient) {}

  // 결재상신 리스트 조회하기
  // param : id(세션id), 0(결재여부,상신완료상태)
  myDocList(id:number): Observable<Doc[]> {
    return this.http.post<Doc[]>(URL+'my', id, HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('myDocList'))
    );
  }

  // 결재승인 리스트 조회하기
  docIngList(id:number, stat:number): Observable<Doc[]> {
    return this.http.post<Doc[]>(URL+'aprv', [id,stat], HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('docIngList'))
    );
  }

  getDetail(id): Observable<Doc> {
    return this.http.get<Doc>(URL + id);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
