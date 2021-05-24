import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { apiConfig, IRound, Icaliber, Iweapon, Iplatform, IweaponAttachements, Iattachement } from 'src/app/Services/apiConfig.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-show-weapons-with-id',
  templateUrl: './show-weapons-with-id.component.html',
  styleUrls: ['./show-weapons-with-id.component.css']
})
export class ShowWeaponsWithIdComponent implements OnInit {

  constructor(private _apiconfig : apiConfig) { }

  weapon: Iweapon;
  weaponList: Iweapon[];
  itemsForWeapon: IweaponAttachements[] = [];
  itemsNotForWeapon: Iattachement[]= [];
  attachement: Iattachement[]= [];
  weaponId: number;
  ngOnInit(): void {
    this._apiconfig.GetAllWeapons().then
    (
      data =>
      {
        this.weaponList = data;
      }
    )
   
 
  }
  SelectToUpdate(event: any) {
    if (event.target.value != "Empty") {
      this.weapon = this.weaponList[event.target.value];
      this.weaponId = this.weapon.id;
      this.onGetItems();
      this._apiconfig.GetAllAttachements().then
      (
        data =>
        {
          this.attachement = data;
        }
      )
    }
  }
  onGetItems()
  {
    this.onGetItemsForPlayer();
  }
  RemoveAttachementFromWeapon(aId:number){
    this._apiconfig.RemoveAttachementFromWeapon(this.weapon.id,aId).subscribe(res=>{
      console.log(res);
      this.onGetItems();
      this.onGetItemsForPlayer();
    })
  }
  AddItemToPlayer(aId:number){
    this._apiconfig.AddAttachementToWeapon(this.weapon.id,aId).subscribe(res=>{
      this.onGetItems();
      this.onGetItemsForPlayer();
    })
  }
  onGetItemsForPlayer(){
    this._apiconfig.GetAttachementForWeapon(this.weapon.id).subscribe(res=>{
      this.itemsForWeapon = res;
      this.itemsNotForWeapon = [];
      //let ids = this.itemsForWeapon.map(pitem=>pitem.attachement.id);
      //this.itemsNotForWeapon = this.attachement.filter(item=>ids.indexOf(item.id)==-1);
      //console.log("not for",this.itemsNotForWeapon);
    })
  }
}
