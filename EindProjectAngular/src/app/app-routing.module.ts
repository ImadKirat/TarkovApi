import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import {ShowAllWeaponsComponent} from 'src/app/WeaponsFolder/show-all-weapons/show-all-weapons.component';
import { LandingComponent } from './LandingPage/landing/landing.component';
import { ShowAllroundsComponent } from './RoundsFolder/show-allrounds/show-allrounds.component';
import {AuthPageComponent} from './JwtLogin/auth-page/auth-page.component'
import {ShowAllPlatformsComponent} from './PlatformFolder/show-all-platforms/show-all-platforms.component'
import {ShowWeaponsWithIdComponent} from './WeaponsFolder/show-weapons-with-id/show-weapons-with-id.component'


const routes: Routes = [
  {path: 'show-all-weapons', component: ShowAllWeaponsComponent},
  {path: 'ShowAllRounds', component: ShowAllroundsComponent},
  {path: 'Platforms', component: ShowAllPlatformsComponent},
  {path: '', redirectTo: 'Login', pathMatch: 'full'},
  {path: '*', redirectTo: 'Login', pathMatch: 'full'},
  {path: 'Login', component: AuthPageComponent},
  {path: 'Home', component: LandingComponent},
  {path: 'attachements', component: ShowWeaponsWithIdComponent}]

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
