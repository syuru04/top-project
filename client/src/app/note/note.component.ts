import { Component, OnInit } from '@angular/core';
import { NoteService } from './note-http.service';
import { Note } from './note.model';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})

export class NoteComponent implements OnInit {
  today = new Date();
  formStat = "list";
  authorId = "N";
  updateId: number;
  index: number;
  start: number;
  range: number;
  page: number;
  id: number;

  notes: Note[];
  note: Note;
  pageTotalRange: number;
  pageArray;
  i: number;
  j: number;

  constructor(private service: NoteService) {
  }

  ngOnInit() {
    this.start = 0;
    this.range = 15;
    this.j = 1;
    this.service.pageCount().subscribe(data => {
      this.pageTotalRange = data;
      this.page = Math.floor(this.pageTotalRange / this.range) + 1;
      if (this.page <= 5) {
        this.pageArray = new Array(this.page);
      } else {
        this.pageArray = new Array(5);
      }

      for (let index = 0; index < this.pageArray.length; index++) {
        this.pageArray[index] = this.j;
        this.j++;
      }
    })
    this.service.pageRange(this.start, this.range).subscribe(data => {
      this.notes = data;
    });

  }

  //newnote 에서 formStat 받아오는 메소드
  outputEvent(formStat: string) {
    this.formStat = formStat;
  }

  //페이징
  pageBtnClick(id) {
    if (id === 1) {
      this.start = 0;
    } else if (id > 1) {
      this.start = (id - 1) * this.range;
    }
    if (id <= this.page) {
      if (id == 2) {
        id = id - 1;
        for (let index = 0; index < this.pageArray.length; index++) {
          this.pageArray[index] = id;
          id++;
        }
      } else if (id >= 3) {
        id = id - 2;
        for (let index = 0; index < this.pageArray.length; index++) {
          this.pageArray[index] = id;
          id++;
        }
      }
      this.service.pageRange(this.start, this.range).subscribe(data => {
        this.notes = data;
      });
    }
  }

  //수정버튼 클릭시 등록화면으로 전환
  goupdate(id,author) {        
      this.formStat = "input";
      this.updateId = id;    
  }

  //목록으로 전환
  btnListClick(): void {
    this.formStat = "list"
  }

  //등록화면으로 전환
  btnNewClick(): void {
    this.formStat = "input"
    this.updateId = undefined;
  }

  //제목 클릭시 상세보기화면으로 전환
  btnTitleClick(id: number, i: number,author:number): void {
    const sessionValue = JSON.parse(sessionStorage.getItem('loginData'));        
    if (sessionValue.id == author){
      this.authorId = 'Y';
    }
    this.index = i;
    this.formStat = "detail"
    this.service.get2(id).subscribe(data => this.note = data);
  }

  //글 삭제
  remove(id: number) {
    if (window.confirm("Delete ?")) {
      this.service.remove(id).subscribe(() => this.notes.splice(id, 1));
      this.formStat = "list"
      window.location.reload();
    } else {
      return false;
    }
  }
}

