import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { apiConfig, IRound, Icaliber, Iweapon, Iplatform, IweaponAttachements, Iattachement } from 'src/app/Services/apiConfig.service';
import { externalApiConfig, Item, RootObject } from 'src/app/Services/externalApiConfig.service'
import { Router } from '@angular/router';
import { ShowWeaponsWithIdComponent } from '../show-weapons-with-id/show-weapons-with-id.component';
@Component({
  selector: 'app-show-all-weapons',
  templateUrl: './show-all-weapons.component.html',
  styleUrls: ['./show-all-weapons.component.css']
})
export class ShowAllWeaponsComponent implements OnInit {

  constructor(private router: Router, private _apiconfig: apiConfig, private _externalApi: externalApiConfig) { }

  weaponListFromApi: Iweapon[];
  caliberListFromApi: Icaliber[];
  platformListFromApi: Iplatform[];
  attachementListFromApi: Iattachement[];
  selectedCaliber: Icaliber;
  selectedPlatform: Iplatform;
  selectedAttachement: Iattachement;
  weaponNameList: string[] = [];
  linkArray: string[] = [];
  imgList: RootObject[] = [];
  counter = 0;
  updatedWeaponAttachement: IweaponAttachements = {
    weaponId: null,
    attachementId: null,
    attachement: null,
    weapon: null
  }
  updatedWeapon: Iweapon = {
    name: "",
    recoil: null,
    platform: null,
    platformid: null,
    caliber: null,
    caliberid: null,
    weaponAttachements: null
  }
  editFlag = false;

  async ngOnInit(): Promise<void> {

    this.weaponListFromApi = await this._apiconfig.GetAllWeapons();
    console.log("weapons", this.weaponListFromApi);
    // await this._apiconfig.GetAllWeapons().then(
    //   data => {
    //     this.weaponListFromApi = data;
    //     console.log("weapons", this.weaponListFromApi);
    //   }
    // )

    this.caliberListFromApi = await this._apiconfig.GetAllCalibers();
    console.log("calibers", this.caliberListFromApi);
    // this._apiconfig.GetAllCalibers().then(
    //   data => {
    //     this.caliberListFromApi = data;
    //     console.log("calibers", this.caliberListFromApi);
    //   }
    // )

    this.platformListFromApi = await this._apiconfig.GetAllPlatforms();
    console.log("Platforms", this.platformListFromApi);
    // this._apiconfig.GetAllPlatforms().then(
    //   data => {
    //     this.platformListFromApi = data;
    //     console.log("Platforms", this.platformListFromApi);
    //   }
    // )
    
    this.attachementListFromApi =  await this._apiconfig.GetAllAttachements();
    console.log("attachements", this.attachementListFromApi);
    // this._apiconfig.GetAllAttachements().then(
    //   data => {
    //     this.attachementListFromApi = data;
    //     console.log("attachements", this.attachementListFromApi);
    //   }
    // )
    this.weaponListFromApi.forEach((weapon: Iweapon) => {
      this.weaponNameList.push(weapon.name);
    })
    // console.log("WEAPONNAMELIST", this.weaponNameList);
    this.weaponNameList.forEach(async (name: string) => {
      const temp = await this._externalApi.GetTarkovItemImage(name).then( value => 
        { return value })
        .catch(e => {
          throw new Error("oof")
      })
      this.linkArray.push(temp.items[0].link.substr(0, temp.items[0].link.lastIndexOf('/revision')))
    })

    console.log("links", this.linkArray);

  }
  EditWeapon(id: number) {
    this.editFlag = true;
    this.updatedWeapon.id = id;
  }
  CancelUpdate() {
    this.editFlag = false;
  }
  ChangeView(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }
  SelectToUpdateCaliber(event: any) {
    if (event.target.value != "Empty") {
      this.selectedCaliber = this.caliberListFromApi[event.target.value];
      console.log("selectedCaliber", this.selectedCaliber);
    }
  }
  SelectToUpdatePlatform(event: any) {
    if (event.target.value != "Empty") {
      this.selectedPlatform = this.platformListFromApi[event.target.value];
      console.log("selectedPlatform", this.selectedPlatform);
    }
  }
  SelectToUpdateAttachement(event: any) {
    if (event.target.value != "Empty") {
      this.selectedAttachement = this.attachementListFromApi[event.target.value];
      console.log("selectedPlatform", this.selectedAttachement);
    }
  }
  UpdateWeapon(_id: number, _name: string, _recoil: number) {
    console.log(_id);
    console.log(_name);
    console.log(this.selectedCaliber);
    console.log(this.selectedPlatform);
    console.log(this.selectedAttachement);
    /*    this._apiconfig.GetWeaponWithId(_id).then(
         data =>
         {
           this.selectedPlatform.weapons = data;
         }
       )
       this.updatedWeaponAttachement.weaponId = _id;
       this.updatedWeaponAttachement.attachementId= this.selectedAttachement.id;
       this.updatedWeaponAttachement.attachement = this.selectedAttachement;
       
       console.log("updated attachement",this.updatedWeaponAttachement);
   */
    this.updatedWeapon.name = _name;
    this.updatedWeapon.recoil = _recoil;
    this.updatedWeapon.platformid = this.selectedPlatform.id;
    this.updatedWeapon.caliberid = this.selectedCaliber.id;
    console.log("platform update", this.selectedPlatform.id);

    this._apiconfig.UpdateWeapon(this.updatedWeapon).then
      (
        (data: Iweapon) => {
          this._apiconfig.GetAllWeapons().then(
            data => {
              this.weaponListFromApi = data;
            }
          )
        }
      )
    this.editFlag = false;
  }
}