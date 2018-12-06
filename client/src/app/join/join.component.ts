import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { JoinService } from './join.service';
import { DeptService } from '../dept/dept-http.service';
import { Dept } from '../dept/dept.model';
import { Emp } from '../emp/emp.model';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  @Output() outputProperty: EventEmitter<any> = new EventEmitter();
  @Input() proc: string;

  loginProc = 'join';
  code: string;
  codeChkYN = 'N'
  depts: Dept[];
  emp: Emp;

  constructor(
    private deptService: DeptService,
    private joinService: JoinService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.deptService.get().subscribe(data => {
      this.depts = data;
    }); 

    if (this.proc == 'empMod') {
      this.code = JSON.parse(sessionStorage.getItem('loginData')).code;
      this.loginService.getEmp(this.code).subscribe(data => {
        this.emp = data;
      })
    }
  }

  cancel(): void {
    this.outputProperty.next({ loginProc: 'login' });
  }
  codeChk(form:NgForm){
    const emp = Object.assign({ done: false }, form.value);    
    if (emp.code == undefined) {
      alert("아이디를 입력하세요");
      return false;
    }
    this.joinService.codeChk(emp.code).subscribe(data => {
      
      if (data > 0) {
        alert("중복된 아이디 입니다.")        
        return false;
      }else if(data ==0){
        if(confirm("   사용가능한 아이디 입니다 \n 이 아이디를 사용하시겠습니까?")){
          this.codeChkYN = 'Y';                  
        };
      }
    });
  }
  f_submit(form: NgForm) {
    const emp = Object.assign({ done: false }, form.value);

    // 회원가입
    if (this.proc == 'join') {           
      if (emp.code == undefined) {
        alert("아이디를 입력하세요");
        return false;
      } else if (emp.pw == null || emp.pw =="") {
        alert("비밀번호를 입력하세요");
        return false;
      } else if (emp.pw != emp.pw2) {
        alert("비밀번호가 일치하지 않습니다")
        return false;
      } else if (emp.name == null || emp.name =="") {
        alert("이름을 입력하세요");
        return false;
      } else if (emp.deptId == undefined) {
        alert("부서를 선택하세요")
        return false;
      } else if (emp.phone == null || emp.phone == "") {
        alert("휴대폰번호를 입력하세요");
        return false;
      } else if (emp.email == null || emp.email == "") {
        alert("이메일을 입력하세요");
        return false;
      } else if (this.codeChkYN == 'N') {
        alert("아이디를 확인하세요");
        return false;
      }
      this.joinService.add(emp).subscribe(emp => {
        this.outputProperty.next({ loginProc: 'login' });
      });

      // 회원정보수정
    } else if (this.proc == 'empMod') {
      if (emp.pw == null || emp.pw =="") {
        alert("비밀번호를 입력하세요");
        return false;
      } else if (emp.deptId == undefined) {
        alert("부서를 선택하세요")
        return false;
      } else if (emp.phone == null || emp.phone == "") {
        alert("휴대폰번호를 입력하세요");
        return false;
      } else if (emp.email == null || emp.email == "") {
        alert("이메일을 입력하세요");
        return false;
      }
      this.joinService.update(emp).subscribe(emp => {
        this.outputProperty.next({ loginProc: 'login' });
      });
    }
  }
}