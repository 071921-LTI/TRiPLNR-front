import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressFormComponent } from './address-form.component';

describe('AddressFormComponent', () => {
  let component: AddressFormComponent;
  let fixture: ComponentFixture<AddressFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'address-form'`, () => {
    expect(component.title).toEqual('address-form');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent);
  });

  it(`should call ngOnInit'`, () => {
    expect(component.ngOnInit).toBeTruthy;
  });

  it(`should call emitAddress'`, () => {
    expect(component.emitAddress).toBeTruthy;
  });
  
  it(`should call emitAddress fail'`, () => {
    expect(component.emitAddress()).toBeFalsy;
  });

});
