import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { apiConfig, IRound, Icaliber, Iplatform, Iweapon } from 'src/app/Services/apiConfig.service';

@Component({
  selector: 'app-show-all-platforms',
  templateUrl: './show-all-platforms.component.html',
  styleUrls: ['./show-all-platforms.component.css']
})
export class ShowAllPlatformsComponent implements OnInit {

  constructor(private _apiconfig : apiConfig) { }

  platformList: Iplatform[];
  selectedPlatform: Iplatform;
  weaponList: Iweapon[];
  ngOnInit(): void {
    this._apiconfig.GetAllPlatforms().then
    (
      data =>
      {
        this.platformList = data;
      }
    )
  }
  SelectToUpdate(event: any)
  {
    if(event.target.value != "Empty"){
      this.selectedPlatform = this.platformList[event.target.value];
    }
      console.log("platform",this.selectedPlatform.id);
      this._apiconfig.GetWeaponForPlatform(this.selectedPlatform.id).then
      (
        data =>
        {
          this.weaponList = data;
          console.log("weapon", this.weaponList);
        }
      )
  }
}
