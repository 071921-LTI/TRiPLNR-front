import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  title:String="address-form";
  constructor() { }

  ngOnInit(): void {
  }

  @Output() newAddressEvent = new EventEmitter<String>();
  @Input() toEmit = false;

  streetAddress : String = '';
  city : String = '';
  state : String = '';
  zip : String = '';

  fullAddress : String = this.streetAddress + ", " + this.city + ", " + this.state + " " + this.zip;


  emitAddress(){
    this.fullAddress = this.streetAddress + ", " + this.city + ", " + this.state + ", " + this.zip;
    this.newAddressEvent.emit(this.fullAddress);
  }

}
