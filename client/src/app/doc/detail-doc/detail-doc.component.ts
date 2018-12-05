import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

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

  docList() {
    this.outputProperty.next({docProc:'list'});  
  }

  mod(id:number): void {
    this.updateId = id;
    this.outputProperty.next({docProc:'mod'});  
  }

  remove(id:number) {
    if (window.confirm("Delete ?")) {
      this.detailDocService.remove(id).subscribe(() => this.docs.splice(id, 1));
      this.outputProperty.next({docProc:'list'});  
      window.location.reload();
    } else {
      return false;
    }
  }   

  aprv(id:number) {
    if (window.confirm("Approval ?")) {
      const sessionValue = JSON.parse(sessionStorage.getItem('loginData'));
      const apprInfo = { docId:id, approver:sessionValue.id, stat:1, ts:this.ts} as Approver; 
      this.detailDocService.aprv(apprInfo).subscribe(data => {
        this.outputProperty.next({docProc:'list'});  
      });
    } else {
      return false;
    }
  }
}
