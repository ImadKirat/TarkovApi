import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllWeaponsComponent } from './show-all-weapons.component';

describe('ShowAllWeaponsComponent', () => {
  let component: ShowAllWeaponsComponent;
  let fixture: ComponentFixture<ShowAllWeaponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllWeaponsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllWeaponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
