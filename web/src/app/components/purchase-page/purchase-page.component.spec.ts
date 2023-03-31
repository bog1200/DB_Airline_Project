import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePageComponent } from './purchase-page.component';

describe('PurchasePageComponent', () => {
  let component: PurchasePageComponent;
  let fixture: ComponentFixture<PurchasePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
