import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWeaponComponent } from './create-weapon.component';

describe('CreateWeaponComponent', () => {
  let component: CreateWeaponComponent;
  let fixture: ComponentFixture<CreateWeaponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWeaponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
