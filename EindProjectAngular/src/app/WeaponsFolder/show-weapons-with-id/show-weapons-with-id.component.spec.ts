import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWeaponsWithIdComponent } from './show-weapons-with-id.component';

describe('ShowWeaponsWithIdComponent', () => {
  let component: ShowWeaponsWithIdComponent;
  let fixture: ComponentFixture<ShowWeaponsWithIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowWeaponsWithIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowWeaponsWithIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
