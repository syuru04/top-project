import { Component, OnInit } from '@angular/core';

import { Doc } from '../model/doc.model';

import { DocHttpService} from '../doc-http.service';

@Component({
  selector: 'app-doc-end',
  templateUrl: './doc-end.component.html',
  styleUrls: ['./doc-end.component.css']
})
export class DocEndComponent implements OnInit {

  id: number;
  updateId : number;
  docProc: string;
  docs: Doc[];
  count: number;
  docMenu: string;  // 결재상신:doc, 결재승인:ing, 결재완료end

  constructor(private docService: DocHttpService) { }

  ngOnInit() {
    // 세션값 가져오기
    const sessionValue = JSON.parse(sessionStorage.getItem('loginData'));
    this.id = sessionValue.id;   

    // 결재완료 리스트 조회하기
    this.docProc = 'list';
    this.docService.docIngList(this.id, 2).subscribe(data => {
      this.docs = data;
      this.count = data.length;
    });
  }

  // 상세보기(제목 클릭)
  detail(docId:number): void {
    this.updateId = docId;
    this.docProc = 'detail';
    this.docMenu = 'end';
  }

}
