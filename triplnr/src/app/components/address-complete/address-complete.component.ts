import { Component, OnInit,AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-address-complete',
  templateUrl: './address-complete.component.html',
  styleUrls: ['./address-complete.component.css']
})
export class AddressCompleteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.addMapsScript();
  }

  ngAfterViewInit(): void{
 
  }

  title = 'google-places-autocomplete';
  userAddress?: string;
  userLatitude?: string;
  userLongitude?: string;
  googleMapsUrl: string = "https://maps.googleapis.com/maps/api/js?key=" + environment.mapsKey + "&libraries=places&language=en";
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

  addMapsScript() {
    if (document.getElementById('JSScript') == null) {
      console.log("We do not have the JSScript yet.");
      if (!document.querySelectorAll(`[src="${this.googleMapsUrl}"]`).length) {
        document.body.appendChild //Append the following to the HTML body.
          (
            Object.assign
              (
                document.createElement('script'),//Create Script Element
                {
                  id: 'JSScript',
                  type: 'text/javascript',
                  src: this.googleMapsUrl
                }
              )
          );
      }
    }
  }

}
