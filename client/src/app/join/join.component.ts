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

  //상위컴포넌트로 데이터넘기기
  @Output() outputProperty: EventEmitter<any> = new EventEmitter();

  //상위컴포넌트에서 데이터받아오기
  @Input() proc: string;

  loginProc = 'join';
  code: string;
  codeChkYN = 'N'
  depts: Dept[];
  emp: Emp;
  joinError = '';
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

  //취소버튼 클릭시 로그인화면으로전환
  cancel(): void {
    this.outputProperty.next({ loginProc: 'login' });
  }

  //아이디 중복확인
  codeChk(form: NgForm) {
    const emp = Object.assign({ done: false }, form.value);
    if (emp.code == undefined) {
      alert("아이디를 입력하세요");
      return false;
    }
    this.joinService.codeChk(emp.code).subscribe(data => {
      if (this.proc == 'join') {
        if (data > 0) {
          alert("중복된 아이디 입니다.")
          return false;
        } else if (data == 0) {
          if (confirm("   사용가능한 아이디 입니다 \n 이 아이디를 사용하시겠습니까?")) {
            this.codeChkYN = 'Y';
          };
        }
      } else if (this.proc == 'empMod') {
        alert("empMod")
        if (emp.code == JSON.parse(sessionStorage.getItem('loginData')).code) {          
          this.codeChkYN = 'Y';          
        } else if (data == 0) {
          if (confirm("   사용가능한 아이디 입니다 \n 이 아이디를 사용하시겠습니까?")) {
            this.codeChkYN = 'Y';
          };
        }else{
          alert("중복된 아이디 입니다.")
          return false;
        }
      }
    });
  }
  a(){
    this.codeChkYN='N';
  }
  //회원가입or정보수정에서 등록버튼 클릭시
  f_submit(form: NgForm) {
    const emp = Object.assign({ done: false }, form.value);
    // 회원가입
    if (this.proc == 'join') {
      if (emp.code == undefined) {
        this.joinError="아이디를 입력하세요";
        setTimeout(() => document.getElementById("id").focus(), 0);
        return false;
      } else if (emp.pw == null || emp.pw == "") {
        this.joinError="비밀번호를 입력하세요";
        setTimeout(() => document.getElementById("pw").focus(), 0);
        return false;
      } else if (emp.pw != emp.pw2) {
        this.joinError="비밀번호가 일치하지 않습니다.";
        setTimeout(() => document.getElementById("pw2").focus(), 0);
        return false;
      } else if (emp.name == null || emp.name == "") {
        this.joinError="이름을 입력하세요";
        setTimeout(() => document.getElementById("name").focus(), 0);
        return false;
      } else if (emp.deptId == undefined) {
        setTimeout(() => document.getElementById("deptId").focus(), 0);
        this.joinError="부서를 선택하세요";
        return false;
      } else if (emp.phone == null || emp.phone == "") {
        setTimeout(() => document.getElementById("phone").focus(), 0);
        this.joinError="휴대폰번호를 입력하세요";
        return false;
      } else if (emp.email == null || emp.email == "") {
        setTimeout(() => document.getElementById("email").focus(), 0);
        this.joinError="이메일을 입력하세요";
        return false;
      } else if (this.codeChkYN == 'N') {
        this.joinError="아이디 중복확인을 하세요";        
        return false;
      }
      this.joinService.add(emp).subscribe(emp => {
        this.outputProperty.next({ loginProc: 'login' });
      });
      // 회원정보수정
    } else if (this.proc == 'empMod') {
      if (emp.pw == null || emp.pw == "") {
        this.joinError="비밀번호를 입력하세요";
        setTimeout(() => document.getElementById("pw").focus(), 0);
        return false;
      } else if (emp.pw != emp.pw2) {
        this.joinError="비밀번호가 일치하지 않습니다.";
        setTimeout(() => document.getElementById("pw2").focus(), 0);
        return false;
      } else if (emp.phone == null || emp.phone == "") {
        this.joinError="휴대폰번호를 입력하세요";
        setTimeout(() => document.getElementById("phone").focus(), 0);
        return false;
      } else if (emp.email == null || emp.email == "") {
        this.joinError="이메일을 입력하세요";
        setTimeout(() => document.getElementById("email").focus(), 0);
        return false;
      }
      this.joinService.update(emp).subscribe(emp => {
        this.outputProperty.next({ loginProc: 'loginSuccess' });
      });
    }
  }
}