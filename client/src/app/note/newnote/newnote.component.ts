import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from '../note.model';
import { NewNoteService } from './newnote-http.service';
import { DatePipe } from '@angular/common';
import { Note3 } from './newnote.model';

@Component({
  selector: 'app-newnote',
  templateUrl: './newnote.component.html',
  styleUrls: ['./newnote.component.css']
})

export class NewnoteComponent implements OnInit {
  notes: Note[];
  note: Note;
  author = 1;
  ts;
  formStat = "";
  addBtn = "Y";
  updateBtn = "N";
  id : number;
  @Output() outputProperty = new EventEmitter<String>();
  @Input() updateId: number;
  @Input() index: number;

  constructor(private service: NewNoteService) { }

  ngOnInit() {
    //상세보기에서 글작성버튼 클릭시, 
    if (this.updateId === undefined) {            
      this.addBtn = "Y";
      this.updateBtn = "N";      
      this.service.get().subscribe(data => {
        this.notes = data;        
      });
    } else {
      //상세보기에서 수정버튼 클릭시
      this.addBtn = "N";
      this.updateBtn = "Y";      
      this.service.get2(this.updateId).subscribe(data => {
        this.note = data;        
      });
    }
  }

  //등록버튼 클릭시
  add(form: NgForm) {
    if (this.updateId === undefined) {
      const sessionValue = JSON.parse(sessionStorage.getItem('loginData'));
      const note = Object.assign({ done: false }, form.value);      
      note.author = sessionValue.id;              
      
      if (note.title === undefined || note.title === "") {
        alert(note.title)
        note.title = "제목없음"
        note.title = note.title.trim();
      }
      if (note.body === undefined || note.body === "") {
        alert(note.title)
        alert("내용을 입력하세요");
        return false;
      }      
      this.service.add(note).subscribe(() => {
          window.location.reload();
          this.formStat = "list";
          this.outputProperty.emit(this.formStat);
        });
    } return false;
  }
  
  //수정버튼 클릭시
  update(form: NgForm) {
    if (this.updateId === undefined) {
      return false;
    } else {      
      let note = Object.assign({ id: this.updateId }, form.value);   
      this.service.update(note).subscribe(() => {
        window.location.reload();
        this.formStat = "list";
        this.outputProperty.emit(this.formStat);
      });
    }
  }

  //취소버튼 클릭시 목록화면으로 전환
  btnCancel() {
    this.formStat = "list";
    this.outputProperty.emit(this.formStat);
  }
 
}


