import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/Services/login-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private http:HttpClient, private router: Router, private login: LoginServiceService) {
    
  }

  access_token !: any;
  response !: any;
  refresh_token !: string|null;
  btnVal = "Login";

  ngOnInit(): void {
    if(window.location.search.length > 0) {
      this.login.handleRedirect();
    }
    else{
      this.access_token = localStorage.getItem("access_token");
      this.refresh_token = localStorage.getItem("refresh_token");
      this.login.getRefreshToken();
    }
    this.login.checkStatus()
    setInterval(()=> { if(this.login.checkStatus()) {
      this.btnVal = "Logout"
    } else {
      this.btnVal = "Login"
    }}, 60000);
  }

  requestAuthorization() {
    this.login.requestAuthorization();
  }
}
