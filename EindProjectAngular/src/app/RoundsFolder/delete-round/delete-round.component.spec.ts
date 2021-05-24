import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRoundComponent } from './delete-round.component';

describe('DeleteRoundComponent', () => {
  let component: DeleteRoundComponent;
  let fixture: ComponentFixture<DeleteRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
