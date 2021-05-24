import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllPlatformsComponent } from './show-all-platforms.component';

describe('ShowAllPlatformsComponent', () => {
  let component: ShowAllPlatformsComponent;
  let fixture: ComponentFixture<ShowAllPlatformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllPlatformsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllPlatformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
