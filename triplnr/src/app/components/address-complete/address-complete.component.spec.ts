import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressCompleteComponent } from './address-complete.component';

describe('AddressCompleteComponent', () => {
  let component: AddressCompleteComponent;
  let fixture: ComponentFixture<AddressCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
