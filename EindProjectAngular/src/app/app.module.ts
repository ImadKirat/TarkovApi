import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowAllroundsComponent } from './RoundsFolder/show-allrounds/show-allrounds.component';
import {apiConfig} from './Services/apiConfig.service';
import {externalApiConfig} from './Services/externalApiConfig.service'
import { ShowRoundWithIdComponent } from './RoundsFolder/show-round-with-id/show-round-with-id.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateRoundComponent } from './RoundsFolder/create-round/create-round.component';
import { DeleteRoundComponent } from './RoundsFolder/delete-round/delete-round.component';
import { UpdateRoundComponent } from './RoundsFolder/update-round/update-round.component';
import { ShowAllWeaponsComponent } from './WeaponsFolder/show-all-weapons/show-all-weapons.component';
import { ShowWeaponsWithIdComponent } from './WeaponsFolder/show-weapons-with-id/show-weapons-with-id.component';
import { CreateWeaponComponent } from './WeaponsFolder/create-weapon/create-weapon.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './LandingPage/landing/landing.component';
import { environment } from '../environments/environment';
import { AuthPageComponent } from './JwtLogin/auth-page/auth-page.component';
import { AngularFireModule } from '@angular/fire';
import { ShowAllPlatformsComponent } from './PlatformFolder/show-all-platforms/show-all-platforms.component';
@NgModule({
  declarations: [
    AppComponent,
    ShowAllroundsComponent,
    ShowRoundWithIdComponent,
    CreateRoundComponent,
    DeleteRoundComponent,
    UpdateRoundComponent,
    ShowAllWeaponsComponent,
    ShowWeaponsWithIdComponent,
    CreateWeaponComponent,
    LandingComponent,
    AuthPageComponent,
    ShowAllPlatformsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase)
    
  ],
  providers: [apiConfig, externalApiConfig],
  bootstrap: [AppComponent],
})
export class AppModule { }