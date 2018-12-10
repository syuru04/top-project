import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Note, Note2, Note3 } from './newnote.model';
import { catchError } from 'rxjs/operators';



const URL = 'http://' + window.location.hostname + ':8080/notes/';


const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class NewNoteService {

  constructor(private http: HttpClient) { }

  //글작성시 정보불러오기
  get(): Observable<Note[]> {
    return this.http.get<Note[]>(URL);
  }

  //글수정시 정보불러오기
  get2(id): Observable<Note> {
    return this.http.get<Note>(URL + id);
  }

  //새글작성
  add(note: Note2): Observable<any> {
    return this.http.post<Note2>(URL, note, HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('insert'))
    );
  }

  //글수정
  update(note: Note3): Observable<any> {
    console.log(note);
    return this.http.put<Note3>(URL, note, HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('update'))
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




