import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { unzipSync } from 'node:zlib';
import { userInfo } from 'node:os';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { AuthPageComponent } from '../JwtLogin/auth-page/auth-page.component';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class apiConfig {
    status;
    errormessage;
    baseURL = "https://cloud-api-314908.ew.r.appspot.com/api/v1/";
    jwt: string = null;
    constructor(private http: HttpClient, private router: Router) { }

    headers = null;


    GetAllRounds(_query?: string, _sort?: string, _dir?: string) {
        let param = new HttpParams().set("name", _query)
            .set("sort", _sort)
            .set("dir", _dir);
        var options = { params: param, Headers: this.headers };
        console.log("JWT", options);
        if (_query == undefined) {
            return this.http.get<IRound[]>(this.baseURL + "Round", {
                params: {
                    sort: _sort,
                    dir: _dir
                },
                'headers': this.headers
            }).toPromise();
        }
        console.log("HEADER", options);
        return this.http.get<IRound[]>(this.baseURL + "Round", {
            params: {
                name: _query,
            }, 'headers': this.headers
        }).toPromise();
    }
    GetAllCalibers() {
        return this.http.get<Icaliber[]>(this.baseURL + "Caliber", { 'headers': this.headers }).toPromise();
    }
    GetAllWeapons() {
        return this.http.get<Iweapon[]>(this.baseURL + "Weapon", { 'headers': this.headers }).toPromise();
    }
    GetAllAttachements() {
        return this.http.get<Iattachement[]>(this.baseURL + "Attachement", { 'headers': this.headers }).toPromise();
    }
    GetAllPlatforms() {
        return this.http.get<Iplatform[]>(this.baseURL + "WeaponPlatform", { 'headers': this.headers }).toPromise();
    }



    GetRoundWithId(id: number) {
        return this.http.get<IRound>(this.baseURL + 'Round/' + id, { 'headers': this.headers }).toPromise();
    }
    GetWeaponWithId(id: number) {
        return this.http.get<Iweapon>(this.baseURL + 'Weapon/' + id, { 'headers': this.headers }).toPromise();
    }
    GetWeaponForPlatform(id: number) {
        return this.http.get<Iweapon[]>(this.baseURL + 'WeaponPlatform/' + id + '/Weapon', { 'headers': this.headers }).toPromise();
    }



    CreateRound(round: IRound) {
        return this.http.post<IRound[]>(this.baseURL + "Round", round, { 'headers': this.headers }).toPromise();
    }
    CreateWeapon(weapon: Iweapon) {
        return this.http.post<Iweapon[]>(this.baseURL + "Weapon", weapon, { 'headers': this.headers }).toPromise();
    }



    DeleteRound(id: number) {
        return this.http.delete<IRound[]>(this.baseURL + 'Round/' + id, { 'headers': this.headers }).toPromise();
    }



    UpdateRound(round: IRound) {
        return this.http.put<IRound>(this.baseURL + "Round", round, { 'headers': this.headers }).toPromise();
    }
    UpdateWeapon(weapon: Iweapon) {
        return this.http.put<Iweapon>(this.baseURL + "Weapon", weapon, { 'headers': this.headers }).toPromise();
    }


    GetAttachementForWeapon(id: number) {
        return this.http.get<IweaponAttachements[]>(this.baseURL + "Weapon/" + id + "/Attachement", { 'headers': this.headers })
    }
    AddAttachementToWeapon(id: number, aId: number) {
        console.log("HEADER", this.headers);
        return this.http.post<IweaponAttachements[]>(this.baseURL + "Weapon/" + id + "/Attachement/" + aId, "", { 'headers': this.headers })

    }
    RemoveAttachementFromWeapon(id: number, aId: number) {
        return this.http.delete(this.baseURL + "Weapon/" + id + "/Attachement/" + aId, { 'headers': this.headers })
    }



    Register(user: Iuser) {
        return this.http.post<Iuser>(this.baseURL + "authmanagement/Register", user).toPromise();
    }
    Login(user: Iuser) {
        return this.http.post(this.baseURL + "authmanagement/Login", user).subscribe((response: IToken) => {
            console.log("respons", response);
            this.headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${response.token}` };
            this.jwt = response.token;
            this.router.navigate([`Home`]);
        });
    }
}
export interface Iuser {
    userName?: string;
    Email: string;
    Password: string;
}
export interface IToken {
    token: string;
    succes: boolean;
    errors: string[];
}

export interface IRound {
    id?: number;
    name: string;
    damage: number;
    penPower: number;
    armorDamage: number;
    accuracy: number;
    fragChance: number;
    caliber: Icaliber;
    caliberid: number;
}

export interface Icaliber {
    id?: number;
    name: string;
}
export interface Iweapon {
    id?: number;
    name: string;
    recoil: number;
    platform: Iplatform;
    platformid: number;
    caliber: Icaliber;
    caliberid: number;
    weaponAttachements: IweaponAttachements;
}

export interface Iattachement {
    id?: number;
    name: string;
    weaponAttachements: IweaponAttachements;
}
export interface IweaponAttachements {
    weaponId: number;
    attachementId: number;
    attachement: Iattachement;
    weapon: Iweapon;
}
export interface Iplatform {
    id?: number;
    name: string;
    weapons: Iweapon;
}