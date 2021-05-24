import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToWeapons(pageName:string):void
  {
    console.log(pageName);
  this.router.navigate([`${pageName}`]);
  }
  goToRounds(pageName:string):void
  {
  this.router.navigate([`${pageName}`]);
  }
  goToCreator(pageName:string):void
  {
  this.router.navigate([`${pageName}`]);
  }
}
