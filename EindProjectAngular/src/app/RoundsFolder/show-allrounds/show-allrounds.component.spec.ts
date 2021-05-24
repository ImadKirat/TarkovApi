import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllroundsComponent } from './show-allrounds.component';

describe('ShowAllroundsComponent', () => {
  let component: ShowAllroundsComponent;
  let fixture: ComponentFixture<ShowAllroundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllroundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllroundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
