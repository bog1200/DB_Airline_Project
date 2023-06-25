import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerInputComponent } from './passenger-input.component';

describe('PassengerInputComponent', () => {
  let component: PassengerInputComponent;
  let fixture: ComponentFixture<PassengerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
