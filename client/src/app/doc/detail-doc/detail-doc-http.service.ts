import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DocApprDetail } from '../model/doc-appr-detail.model';
import { Approver } from '../model/approver.model';

const URL = 'http://localhost:8080/docs/';
const URL_appr = 'http://localhost:8080/appr/';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class DetailDocHttpService {

  constructor(private http: HttpClient) { }

  getApproverList(id:number): Observable<DocApprDetail[]> {      
    return this.http.post<DocApprDetail[]>(URL_appr+'a/', id, HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('getApproverList'))
    );
  }

  remove(id: number): Observable<any> {
    return this.http.delete(URL + id).pipe(
      catchError(this.handleError<any>('delete'))
    );
  }

  aprv(approver: Approver): Observable<any> {
    return this.http.put<Approver>(URL_appr, approver, HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('aprv'))
    );
  }

  getApprCnt(id:number): Observable<any> {      
    return this.http.post<any>(URL+'c', id, HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('getApprCnt'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
