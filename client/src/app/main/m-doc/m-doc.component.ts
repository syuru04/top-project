import { Component, OnInit } from '@angular/core';
import { Doc } from 'src/app/doc/model/doc.model';
import { MDocHttpService } from './m-doc-http.service';

@Component({
  selector: 'app-m-doc',
  templateUrl: './m-doc.component.html',
  styleUrls: ['./m-doc.component.css']
})
export class MDocComponent implements OnInit {
  docs : Doc[]
  constructor(private docService: MDocHttpService) { }

  ngOnInit() {    
    //리스트불러오기
    this.docService.pageRange(0,5).subscribe(data => {
      this.docs = data;
    });
  } 
}
