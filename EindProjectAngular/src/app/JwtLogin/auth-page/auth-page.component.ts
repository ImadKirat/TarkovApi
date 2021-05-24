import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { apiConfig, Iuser } from 'src/app/Services/apiConfig.service';
import { templateJitUrl } from '@angular/compiler';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

  constructor(private _apiconfig : apiConfig, private router: Router,public authService: AuthService) { }
  user: Iuser = {userName: null, Email:"",Password: ""};
  registerFlag = false;
  response: Iuser;
  token: string;
  ngOnInit(): void {
    
  }
  ClickRegister()
  {
    this.registerFlag = true;
  }
  Register(uname:string, mail:string, pw:string)
  {
    this.user.userName = uname;
    this.user.Email = mail
    this.user.Password = pw;

     this._apiconfig.Register(this.user).then
    (
      data=>
      {

      }
    );
    this.registerFlag = false;
  }
  Login(mail:string, pw:string)
  {
    this.user.Email = mail
    this.user.Password = pw;
    console.log("user", this.user);
     this._apiconfig.Login(this.user);
    
  }
}