import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { apiConfig, Icaliber, IRound } from 'src/app/Services/apiConfig.service';
import { NumberValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-update-round',
  templateUrl: './update-round.component.html',
  styleUrls: ['./update-round.component.css']
})
export class UpdateRoundComponent implements OnInit {

  constructor(private _apiconfig : apiConfig) { }
  //singleRound: IRound = {name :"", damage : null, penPower :null, armorDamage: null ,accuracy : null, fragChance : null, caliberid :null };

  ngOnInit(): void {
  }

}
