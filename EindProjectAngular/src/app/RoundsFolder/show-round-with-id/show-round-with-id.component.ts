import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { apiConfig, IRound } from 'src/app/Services/apiConfig.service';

@Component({
  selector: 'app-show-round-with-id',
  templateUrl: './show-round-with-id.component.html',
  styleUrls: ['./show-round-with-id.component.css']
})
export class ShowRoundWithIdComponent implements OnInit {

  constructor(private _apiconfig : apiConfig) { }
  inputId: number;
  singleRound: IRound[];
  ngOnInit(): void {
  }
  GetinputData(_inputId)
  {
    this.inputId = _inputId;
    console.log(this.inputId);

    this._apiconfig.GetRoundWithId(this.inputId).then
    (
      data=>
      {
        //this.singleRound = data;
        console.log(this.singleRound);
      }

    );
  }
}