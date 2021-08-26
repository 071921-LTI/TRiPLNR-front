import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() newAddressEvent = new EventEmitter<String>();

  streetAddress : String = '';
  city : String = '';
  state : String = '';
  zip : String = '';

  fullAddress : String = this.streetAddress + ", " + this.city + ", " + this.state + " " + this.zip;


  emitAddress() : void{
    this.newAddressEvent.emit(this.fullAddress);
  }

}
