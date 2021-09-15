import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-address-complete',
  templateUrl: './address-complete.component.html',
  styleUrls: ['./address-complete.component.css']
})
export class AddressCompleteComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void {   
  }

  title = 'google-places-autocomplete';
  userAddress?: string;
  userLatitude?: string;
  userLongitude?: string;
  zip ?: string;
  state?: string;
  city ?: string;
  streetAddress?: string;


  handleAddressChange(address: any) {
    this.userAddress = address.formatted_address
    this.userLatitude = address.geometry.location.lat()
    this.userLongitude = address.geometry.location.lng()
    var splitted = this.userAddress?.split(",",3); 
    var temp = splitted?.pop()?.split(" ");
    this.zip = temp?.pop();
    this.state = temp?.pop();
    this.city = splitted?.pop();
    this.streetAddress = splitted?.pop();
  }

}
