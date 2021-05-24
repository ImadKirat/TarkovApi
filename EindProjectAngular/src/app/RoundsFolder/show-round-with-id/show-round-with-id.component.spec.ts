import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRoundWithIdComponent } from './show-round-with-id.component';

describe('ShowRoundWithIdComponent', () => {
  let component: ShowRoundWithIdComponent;
  let fixture: ComponentFixture<ShowRoundWithIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRoundWithIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRoundWithIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
