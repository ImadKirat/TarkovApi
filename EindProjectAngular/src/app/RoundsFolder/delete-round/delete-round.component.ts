import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { apiConfig, IRound } from 'src/app/Services/apiConfig.service';

@Component({
  selector: 'app-delete-round',
  templateUrl: './delete-round.component.html',
  styleUrls: ['./delete-round.component.css']
})
export class DeleteRoundComponent implements OnInit {

  constructor(private _apiconfig : apiConfig) { }
  inputId: number;
  singleRound: IRound[];
  ngOnInit(): void {
  }

  GetinputData(_inputId)
  {
    this.inputId = _inputId;
    console.log(this.inputId);

    this._apiconfig.DeleteRound(this.inputId).then
    (
      data=>
      {
        this.singleRound = data;
      }

    );

}
}
