import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Doc } from '../model/doc.model';
import { Approver } from '../model/approver.model';
import { DocApprDetail } from '../model/doc-appr-detail.model';

import { NewDocHttpService } from './new-doc-http.service';
import { DocHttpService } from '../doc-http.service';
import { DetailDocHttpService } from '../detail-doc/detail-doc-http.service';

@Component({
  selector: 'app-new-doc',
  templateUrl: './new-doc.component.html',
  styleUrls: ['./new-doc.component.css']
})
export class NewDocComponent implements OnInit {

  @Output() outputProperty: EventEmitter<any> = new EventEmitter();
  @Input() updateId: number;

  doc: Doc;
  docs: Doc[];
  docApprs: DocApprDetail[];

  lev1Dept: string;   lev1Chief: number;    lev1Name: string;
  lev2Dept: string;   lev2Chief: number;    lev2Name: string;
  lev3Dept: string;   lev3Chief: number;    lev3Name: string;

  ts: string;
  author: number;
  docProc: string;
  docId: number;

  chief1: number;     chief2: number;       chief3: number;

  constructor(
    private newDocService: NewDocHttpService,
    private docService: DocHttpService,
    private detailDocService: DetailDocHttpService
    ) { }


  ngOnInit() {    
    // 세션정보 가져오기
    const sessionValue = JSON.parse(sessionStorage.getItem('loginData'));
    this.author = sessionValue.id;

    // 해당 세션ID의 상위부서장 데이터 저장
    this.newDocService.getUpinfo(sessionValue.deptId).subscribe(data => {
      this.lev1Dept = data.lev1Dept,
      this.lev1Chief = data.lev1Chief,
      this.lev1Name = data.lev1Name,
      this.lev2Dept = data.lev2Dept,
      this.lev2Chief = data.lev2Chief,
      this.lev2Name = data.lev2Name,
      this.lev3Dept = data.lev3Dept,
      this.lev3Chief = data.lev3Chief,
      this.lev3Name = data.lev3Name,
      this.chief1 = data.lev1Chief
    });

    // 현재 날짜,시간 불러오기
    var datePipe = new DatePipe("en-US");
    var date2 = datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.ts = date2;    
    
    // 수정일 경우
    if (this.updateId != undefined) {
      // form에 데이터 불러오기
      this.docService.getDetail(this.updateId).subscribe(data => {
        this.doc = data;
        this.docProc = 'detail';
      });

      // 전결(결재자) 불러오기
      this.detailDocService.getApproverList(this.updateId).subscribe(data => {
        this.docApprs = data;      
      });
    }   
  }

  // 저장버튼 클릭
  f_action(form: NgForm) {

    // 수정
    if(this.docProc=='detail') {    
      const modDoc = Object.assign({ id: this.updateId }, form.value);
      this.newDocService.update(modDoc).subscribe(result => {
        this.outputProperty.next({docProc:'list'});  
        window.location.reload();   
      }); 
      
    // 등록
    } else {
      const newDoc = Object.assign({ done: false }, form.value);    
      this.newDocService.add(newDoc).subscribe(result => {    
        console.log("result:====> " + result);
            
        this.docId = result;
        
        // 결재자 테이블에 저장          
        this.appr_lev1();
        if(this.chief2!=0) this.appr_lev2();
        if(this.chief3!=0) this.appr_lev3();

        this.outputProperty.next({docProc:'list'});  
        window.location.reload();   
      }); 
    }     
  }

  // 결재자 등록 메소드
  private appr_lev1(): void {
    const appr = { docId:this.docId, approver:this.chief1, ts:this.ts} as Approver;    
    this.newDocService.addAppr(appr).subscribe(data => {  
    });
  }
  private appr_lev2(): void {
    const appr = { docId:this.docId, approver:this.chief2, ts:this.ts} as Approver;    
    this.newDocService.addAppr(appr).subscribe(data => {});
  }
  private appr_lev3(): void {
    const appr = { docId:this.docId, approver:this.chief3, ts:this.ts} as Approver;    
    this.newDocService.addAppr(appr).subscribe(data => {});
  }

  // 결재자 radoi Button
  // 선택시 이전부서장까지 선택처리
  rdo1Click(lev1Chief) {
    this.chief1 = lev1Chief;
    this.chief2 = 0;
    this.chief3 = 0;
  }
  rdo2Click(lev1Chief,lev2Chief) {
    this.chief1 = lev1Chief;
    this.chief2 = lev2Chief;
    this.chief3 = 0;
  }
  rdo3Click(lev1Chief,lev2Chief,lev3Chief) {
    this.chief1 = lev1Chief;
    this.chief2 = lev2Chief;
    this.chief3 = lev3Chief;
  }

  // 목록으로 돌아가기
  cancel(form: NgForm): void {
    this.outputProperty.next({docProc:'list'});
  }
}
