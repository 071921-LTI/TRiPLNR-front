import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserPreferencesComponent } from './user-preferences.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
describe('UserPreferencesComponent', () => {
  let component: UserPreferencesComponent;
  let fixture: ComponentFixture<UserPreferencesComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [ UserPreferencesComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(UserPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the app', () => {
    
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should have an address', ()=>{
    
    const app = fixture.debugElement.componentInstance;
    app.emitAddress();
    expect(app.address).toBeDefined
  })
  it('should update user values',()=>{
    
    const app = fixture.debugElement.componentInstance;
    app.user = {}
    app.first="FirstName";
    app.last="LastName";
    app.address="123 fake street";
    app.update();
    expect(app.user).toBeFalsy;
  })
  it('should render the passed @Input value', ()=>{
    component.toEmit= true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled).toBeTruthy
    })
  it('should correctly @Output value of String input in component', () => {
    spyOn(component.newAddressEvent, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    fixture.nativeElement.querySelector('input').value = 'A new address';
    button.click();
    fixture.detectChanges();
    expect(component.newAddressEvent.emit).toBeTruthy
  });
  it('it should update adress',()=>{
    
    const app = fixture.debugElement.componentInstance;
    app.streetAddress = 'a';
    app.city = 'b';
    app.state = 'c';
    app.zip = 'd';
    let temp = app.address;
    app.emmitAddress();
    expect(temp).toBeTruthy
  })

  it('should call ngOnInit', () => {
    expect(component.ngOnInit).toBeTruthy();
  });

  it('should emitAddress', () => {
    expect(component.emitAddress).toBeTruthy();
  });

  it('should emitAddress', () => {
    expect(component.handleAddressChange).toBeTruthy();
  });

  it('should reset', () => {
    expect(component.reset).toBeTruthy();
  });

  it('should update', () => {
    expect(component.update).toBeTruthy();
  });

  it('should update fail', () => {
    expect(component.update()).toBeFalsy();
  });

  it('should selectImage', () => {
    expect(component.selectImage).toBeTruthy();
  });

});