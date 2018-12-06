import { Component } from '@angular/core';
import { LoginService } from './login/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  loginProc = 'login';
  sessionName : string;


  constructor(private loginService: LoginService) {
    const sessionValue = JSON.parse(sessionStorage.getItem('loginData'));
    if (sessionValue) {
      this.loginProc = 'loginSuccess'
      this.sessionName = sessionValue.name;
    } else {
      return null;
    }
  }

  //로그아웃 클릭시
  logOut(): void {
    sessionStorage.clear();
    this.loginProc = 'login';
  }

  //join에서 데이터받아오기
  receive(data): void {
    this.loginProc = data.loginProc
  }

  //회원정보수정 클릭시
  empMod(): void {
    const sessionValue = JSON.parse(sessionStorage.getItem('loginData'));
    var userInput = prompt("비밀번호를 입력하세요");
    
    this.loginService.pwChk(sessionValue.code, userInput).subscribe(
      result => {
        if (userInput != null) {
          if (result) {
            this.loginProc = 'empMod';
          } else {
            alert("비밀번호가 올바르지 않습니다.")
          }
        }
      });
  }
}
