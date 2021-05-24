import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { apiConfig, IRound, Icaliber } from 'src/app/Services/apiConfig.service';

@Component({
  selector: 'app-show-allrounds',
  templateUrl: './show-allrounds.component.html',
  styleUrls: ['./show-allrounds.component.css']
})
export class ShowAllroundsComponent implements OnInit {

  constructor(private _apiconfig: apiConfig) { }
  editFlag = false;
  RoundId: number;
  selectedCaliber: Icaliber;
  selectedRound: IRound;
  caliberList: Icaliber[];
  roundList: IRound[];
  singleRound: IRound = { name: "", damage: null, penPower: null, armorDamage: null, accuracy: null, fragChance: null, caliberid: null, caliber: null };
  singleRoundName: IRound = { name: "", damage: null, penPower: null, armorDamage: null, accuracy: null, fragChance: null, caliberid: null, caliber: null };
  roundName: string;
  roundDamage: number;
  roundPenpower: number;
  roundArmorDamage: number;
  roundAccuracy: number;
  roundFragChance: number;
  inputId: number;
  searchQ: string;
  alertFlag = true;
  successMessage = false;

  sortFlag= true;
  sortVerb:string = "";
  ngOnInit(): void {
    console.log(this.editFlag);
    this._apiconfig.GetAllRounds().then
      (
        data => {
          this.roundList = data;
          console.log("ROUNDS BABY", this.roundList);
        }
      );
    this._apiconfig.GetAllCalibers().then
      (
        data => {
          this.caliberList = data
          console.log(this.caliberList);
        }
      )

  }
  GetItem(_id: number) {

    this.editFlag = true;
    console.log(_id);
  }
  Cancel() {
    this.editFlag = false;
  }
  SelectToUpdate(event: any) {
    /*console.log(event.target.value)
    console.log(this.allItems[event.target.value])*/
    if (event.target.value != "Empty") {
      this.selectedCaliber = this.caliberList[event.target.value];
    }
    console.log("caliber", this.selectedCaliber)
  }
  SelectToUpdateId(event: any) {
    if (event.target.value != "Empty") {
      this.selectedRound = this.roundList[event.target.value];
    }
    this._apiconfig.GetRoundWithId(this.selectedRound.id).then
      (
        data => {
          this.singleRound = data;
        }

      );
    this.successMessage = true;
    console.log("selected", this.singleRound);
    this.alertFlag = true;
  }
  CloseAlert() {
    this.alertFlag = false;
  }
  GetinputData(_id: number, _name: string, _damage: number, _penpower: number, _armordamage: number, _accuracy: number, _fragchance: number, _caliber: Icaliber) {
    this.singleRound.id = _id;
    this.singleRound.name = _name;
    this.singleRound.damage = _damage;
    this.singleRound.penPower = _penpower;
    this.singleRound.armorDamage = _armordamage;
    this.singleRound.accuracy = _accuracy;
    this.singleRound.fragChance = _fragchance;
    this.singleRound.caliberid = _caliber.id;
    this.singleRound.caliber = _caliber;
    this.editFlag = false;
    this._apiconfig.UpdateRound(this.singleRound).then
      (
        (data: IRound) => {
          this._apiconfig.GetAllRounds().then
            (
              data => {
                this.roundList = data;
                console.log(this.roundList);
              }
            );
        }

      );
  }
  GetRound(_id: number, _name: string, _damage: number, _penpower: number, _armordamage: number, _accuracy: number, _fragchance: number, _caliber: Icaliber) {
    this.singleRoundName.name = _name;
    this.singleRoundName.damage = _damage;
    this.singleRoundName.penPower = _penpower;
    this.singleRoundName.armorDamage = _armordamage;
    this.singleRoundName.accuracy = _accuracy;
    this.singleRoundName.fragChance = _fragchance;
    this.singleRoundName.caliberid = _caliber.id;
    this._apiconfig.CreateRound(this.singleRoundName).then
      (
        (data: IRound[]) => {
          this._apiconfig.GetAllRounds().then
            (
              data => {
                this.roundList = data;
              }
            );
        }

      );
    this.singleRoundName = { name: "", damage: null, penPower: null, armorDamage: null, accuracy: null, fragChance: null, caliberid: null, caliber: null };
  }
  Sort()
  {
    if(this.sortFlag)
    {
      this.sortVerb = "desc";
      this.sortFlag = false;
    }
    else
    {
      this.sortVerb = "asc";
      this.sortFlag = true;
    }
    console.log("it happend");
    this._apiconfig.GetAllRounds(this.searchQ,"name",this.sortVerb).then
      (
        data => {
          this.roundList = data;
          console.log("ffe kijke", this.roundList);
        }
      );
  }
  RemoveRound(_inputId) {
    this.inputId = _inputId;
    this._apiconfig.DeleteRound(this.inputId).then
      (
        data => {
          this._apiconfig.GetAllRounds().then
            (
              data => {
                this.roundList = data;
              }
            );
        }

      );
  }
  Searchparam(inputText: string) {
    this.searchQ = inputText;
    this._apiconfig.GetAllRounds(this.searchQ).then
      (
        data => {
          this.roundList = data;
          console.log("ffe kijke", this.roundList);
        }
      );
  }
}