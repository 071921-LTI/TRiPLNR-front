import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';

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
  options = {
    types: ['address'],
  } as Options;
  


  handleAddressChange(address: any) {
    this.userAddress = address.formatted_address
    this.userLatitude = address.geometry.location.lat()
    this.userLongitude = address.geometry.location.lng()
    var splitted = this.userAddress?.split(","); 
    //var temp = splitted?.pop()?.split(" ");
    if (splitted![2].split(" ").length > 2){
      this.zip = splitted![2].split(" ")[2];
    }
    this.state = splitted![2].split(" ")[1];
    this.city = splitted![1].split(" ")[1];
    this.streetAddress = splitted![0];
  }

}
