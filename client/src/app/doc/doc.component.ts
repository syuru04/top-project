import { Component, OnInit, Input } from '@angular/core';

import { Doc } from './model/doc.model';
import { DocHttpService} from './doc-http.service';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.css']
})
export class DocComponent implements OnInit {

  docs: Doc[];
  doc: Doc;
  id: number;
  updateId : number;
  docProc: string;  // list, ins, mod
  docMenu: string;  // 결재상신:doc, 결재승인:ing, 결재완료end
  count: number;

  constructor(private docService: DocHttpService) { }

  ngOnInit() {
    // 세션값 가져오기
    const sessionValue = JSON.parse(sessionStorage.getItem('loginData'));
    this.id = sessionValue.id;    

    // 내 결재 리스트 조회하기
    this.docProc = 'list';
    this.docService.myDocList(this.id).subscribe(data => {
      this.docs = data;
      this.count = data.length;
    });
  }

  // 자식 컴포넌트에서 데이터받기(docProc)
  receive(data):void {
    this.docProc = data.docProc
  }
  
  // 신규 결재상신(결재등록 버튼 클릭)
  new(): void {
    this.docProc = 'ins';
    this.updateId = undefined;
  }

  // 상세보기(제목 클릭)
  detail(docId:number): void {
    this.updateId = docId;
    this.docProc = 'detail';
    this.docMenu = 'doc';
  }
}
