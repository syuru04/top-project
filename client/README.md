# Project : 기업 인트라넷 전용 WEB

* This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.2.
* Spring Boot
* MariaDB (MySql)


## Client 설치 
```
$ git clone https://github.com/syuru04/top-project.git
$ cd top-project
$ cd client
$ npm install
$ ng serve -o
```
* [Visual Studio Code download](https://code.visualstudio.com/)


## Server 설치 및 실행
* [STS 3 download](https://spring.io/tools3/sts/all)
* STS 설정
   1) STS실행(작업할 workspace 폴더생성 후 선택)
   2) 인코딩 `UTF-8`로 설정 : Window-Preferences → Workspace, CSS Files, HTML Files, JSP Files, XML Files
   3) [Lombok download](https://projectlombok.org/download) → lombok.jar 설치된 디렉토리에서 cmd → $ java -jar lombok.jar → STS.exe 선택 후 install
   4) File-Import-Maven#Existing Maven Projects → server-pom.xml 체크 후 Finish
   5) 프로젝트 우클릭 → Maven → `Update Project`
* 서버실행 
   1) 프로젝트 우클릭 → Run as → `Spring Boot App` 으로 실행



## 그 외 개발을 위해 사용한 프로그램
* [PostMan](https://www.getpostman.com/apps)
* [Toad for MySQL](https://www.toadworld.com/downloads)