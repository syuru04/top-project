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



  constructor(private loginService: LoginService) {
    const sessionValue = JSON.parse(sessionStorage.getItem('loginData'));
    if (sessionValue) {
      this.loginProc = 'loginSuccess'
    } else {
      return null;
    }
  }

  logOut(): void {
    sessionStorage.clear();
    this.loginProc = 'login';
  }

  receive(data): void {
    this.loginProc = data.loginProc
  }

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
