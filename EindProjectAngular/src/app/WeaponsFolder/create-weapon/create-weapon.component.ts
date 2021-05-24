import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NumberValueAccessor } from '@angular/forms';
import { Iattachement, Icaliber, Iplatform, Iweapon, apiConfig, IweaponAttachements } from 'src/app/Services/apiConfig.service';

@Component({
  selector: 'app-create-weapon',
  templateUrl: './create-weapon.component.html',
  styleUrls: ['./create-weapon.component.css']
})
export class CreateWeaponComponent implements OnInit {

  constructor(private _apiconfig : apiConfig) { }

  singleWeapon: Iweapon =
  {
    name:"",
    recoil: null,
    platform: null,
    caliber: null,
    weaponAttachements: null,
    caliberid: null,
    platformid: null

  };
  weaponName: string;
  weaponRecoil: number;
  weaponPlatform: Iplatform;
  weaponCaliber: Icaliber;
  weaponAttachement: Iattachement;
  selectedCaliber: Icaliber;
  caliberList: Icaliber[];
  selectedPlatform: Iplatform;
  platformList: Iplatform[];
  selectedWeaponAttachement: IweaponAttachements;
  weaponAttachementList: IweaponAttachements[];
  selectedAttachement: Iattachement;
  attachementList: Iattachement[];

  ngOnInit(): void {
    this._apiconfig.GetAllCalibers().then
    (
      data=>
      {
        this.caliberList = data
        console.log(this.caliberList);
      }
    )
    this._apiconfig.GetAllPlatforms().then
    (
      data=>
      {
        this.platformList = data
        console.log("LIJST",this.platformList);

      }
    )
    this._apiconfig.GetAllAttachements().then
    (
      data=>
      {
        this.attachementList = data
        console.log(this.attachementList);
      }
    )
  }
  SelectToUpdateCaliber(event: any){
    if(event.target.value != "Empty"){
      this.selectedCaliber = this.caliberList[event.target.value];
      console.log("caliber",this.selectedCaliber);

    }
  }
  SelectToUpdatePlatform(event: any){
    
    if(event.target.value != "Empty"){
      this.selectedPlatform = this.platformList[event.target.value];
      console.log("PLATFORM",this.selectedPlatform);
      console.log("LOG KIJK EVENT", event.target.value);
    }
  }
  SelectToUpdateAttachement(event: any){
    
    if(event.target.value != "Empty"){
      this.selectedWeaponAttachement = this.weaponAttachementList[event.target.value];
    }
  }
  GetinputData(_name: string,_recoil: number,_platformid: number,_caliberid: number,_attachement: IweaponAttachements)
  {
    console.log("SHOW PLATFRORM",this.singleWeapon.platform);
    this.singleWeapon.name = _name;
    this.singleWeapon.recoil = _recoil;
    this.singleWeapon.platformid = _platformid;
    this.singleWeapon.caliberid = _caliberid;
    this.singleWeapon.weaponAttachements = _attachement;

    console.log("HIER IS WAPEN",this.singleWeapon);
    this._apiconfig.CreateWeapon(this.singleWeapon).then
    (
      (data : Iweapon[]) =>
      {
        console.log("HIER IS WAPEN",this.singleWeapon);
      }
      
    );
    console.log("HIER IS WAPEN",this.singleWeapon);
    this._apiconfig.CreateWeapon(this.singleWeapon).then
    (
      (data : Iweapon[]) =>
      {
        console.log("HIER IS WAPEN",this.singleWeapon);
      }
      
    );
    // getrewqustr vooor rounds
  }
}
