import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

import { Doc } from '../model/doc.model';
import { Approver } from '../model/approver.model';
import { DocApprDetail } from '../model/doc-appr-detail.model';

import { DocHttpService } from '../doc-http.service';
import { DetailDocHttpService } from './detail-doc-http.service';

@Component({
  selector: 'app-detail-doc',
  templateUrl: './detail-doc.component.html',
  styleUrls: ['./detail-doc.component.css']
})
export class DetailDocComponent implements OnInit {

  @Output() outputProperty: EventEmitter<any> = new EventEmitter();
  @Input() updateId: number;

  doc: Doc;
  docs: Doc[];
  docProc: string;
  docApprs: DocApprDetail[];
  ts: string;
  docId: number;
  approver: number;
  returnMod: boolean;
  stat: string;

  constructor(
    private detailDocService: DetailDocHttpService,
    private docService: DocHttpService) { }

  ngOnInit() {
    var datePipe = new DatePipe("en-US");
    var date2 = datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.ts = date2;
    
    this.docService.getDetail(this.updateId).subscribe(data => {
      this.doc = data;      
    });

    this.detailDocService.getApproverList(this.updateId).subscribe(data => {
      this.docApprs = data;            
    });
  }

  // 승인버튼 클릭
  aprv(id:number) {
    if (window.confirm("Approval ?")) {
      const sessionValue = JSON.parse(sessionStorage.getItem('loginData'));
      const apprInfo = { docId:id, approver:sessionValue.id, stat:2, ts:this.ts} as Approver; 
      this.detailDocService.aprv(apprInfo).subscribe(data => {
        this.outputProperty.next({docProc:'list'});  
      });
    } else {
      return false;
    }
  }

  // 반려버튼 클릭
  return(): void {
    this.returnMod=true;
  }

  // 반려폼에서 닫기버튼 클릭
  cancel(): void {
    this.returnMod=false;
  }

  // 반려폼에서 입력버튼 클릭
  returnAction(form: NgForm, id:number) {
    if (window.confirm("Return ?")) {
      const sessionValue = JSON.parse(sessionStorage.getItem('loginData'));      
      const apprInfo = { docId:id, approver:sessionValue.id, stat:1, reason:form.value.reason, ts:this.ts } as Approver; 
      this.detailDocService.aprv(apprInfo).subscribe(data => {
        this.outputProperty.next({docProc:'list'});  
      });
    } else {
      return false;
    }
  }

   // 삭제버튼 클릭
   remove(id:number) {
    if (window.confirm("Delete ?")) {
      this.detailDocService.remove(id).subscribe(() => this.docs.splice(id, 1));
      this.outputProperty.next({docProc:'list'});  
      window.location.reload();
    } else {
      return false;
    }
  }   

  // 수정버튼 클릭
  mod(id:number): void {
    this.updateId = id;
    this.outputProperty.next({docProc:'mod'});  
  }

  // 목록버튼 클릭
  docList() {
    this.outputProperty.next({docProc:'list'});  
  }

}
