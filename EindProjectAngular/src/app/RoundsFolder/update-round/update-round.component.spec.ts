import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRoundComponent } from './update-round.component';

describe('UpdateRoundComponent', () => {
  let component: UpdateRoundComponent;
  let fixture: ComponentFixture<UpdateRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
