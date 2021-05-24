import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { apiConfig, Icaliber, IRound } from 'src/app/Services/apiConfig.service';
import { NumberValueAccessor } from '@angular/forms';


@Component({
  selector: 'app-create-round',
  templateUrl: './create-round.component.html',
  styleUrls: ['./create-round.component.css']
})
export class CreateRoundComponent implements OnInit {

  constructor(private _apiconfig : apiConfig) { }
  roundList: IRound[];
  selectedCaliber: Icaliber;
  caliberList: Icaliber[];
  singleRound: IRound = {name :"", damage : null, penPower :null, armorDamage: null ,accuracy : null, fragChance : null, caliberid :null, caliber:null };
  roundName: string;
  roundDamage: number;
  roundPenpower :number;
  roundArmorDamage: number;
  roundAccuracy: number;
  roundFragChance: Number;
  ngOnInit(): void {
    this._apiconfig.GetAllCalibers().then
    (
      data=>
      {
        this.caliberList = data
        console.log(this.caliberList);
      }
    )
 
  }
  GetinputData(_name: string,_damage: number,_penpower: number,_armordamage: number,_accuracy: number,_fragchance: number,_caliber: Icaliber)
  {
    
    this.singleRound.name = _name;
    this.singleRound.damage = _damage;
    this.singleRound.penPower = _penpower;
    this.singleRound.armorDamage = _armordamage;
    this.singleRound.accuracy = _accuracy;
    this.singleRound.fragChance= _fragchance;
    this.singleRound.caliberid = _caliber.id;
    //console.log(this.singleRound);
    this._apiconfig.CreateRound(this.singleRound).then
    (
      (data : IRound[]) =>
      {
        console.log(this.singleRound);
      }
      
    );
    // getrewqustr vooor rounds
  }
  SelectToUpdate(event: any){
    /*console.log(event.target.value)
    console.log(this.allItems[event.target.value])*/
    if(event.target.value != "Empty"){
      this.selectedCaliber = this.caliberList[event.target.value];
    }
      //console.log(this.slctItem.name)
  }
    

  }