import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { User } from 'src/app/models/user';
import { UserServiceService } from 'src/app/services/user-service.service';
@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.css']
})
export class UserPreferencesComponent implements OnInit {

  stateArr = ['CT', 'GA', 'NY', 'VT', 'TX'];

  @ViewChild('fileInput')
  fileInput!: ElementRef;

  user?:User;
  response?: String;

  //token is set to the authorization token that is stored by the current session
  token = sessionStorage.getItem("token") || '';
  
  userId?: number;
  sub?: String;
  first?: String;
  last?: String;
  profilePic?: String = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';
  bio?: String = '';
  streetAddress ?: String ;
  city ?: String ;
  state ?: String ;
  zip ?: String ;
  address? : String;
  trips?:Trip[];
  friends?:User[];

  imageFile?: File;
  imageFileUrl: any = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';

  //initializes the current users information by getting the current user data from user service
  constructor(private userService : UserServiceService) { 
    this.userService.getCurrentUser(this.token).subscribe(
      response => {
        //response object containing data of current user
        this.userId = response.userId;
        this.sub = response.sub;
        this.first = response.firstName;
        this.last = response.lastName;
        this.profilePic = response.profilePic;
        this.imageFileUrl = response.profilePic;
        this.bio = response.bio;
        this.address = response.address;
        var splitted = response.address?.split(",",3); 
        var temp = splitted?.pop()?.split(" ");
        this.zip = temp?.pop();
        this.state = temp?.pop();
        this.city = splitted?.pop();
        this.streetAddress = splitted?.pop();
        this.friends = response.friends!;
        this.trips = response.trips!;
        
      }
    )
  }

  //this directive is used to emit a formatted address to be passed in to the user object
  @Output() newAddressEvent = new EventEmitter<String>();
  @Input() toEmit = false;


  emitAddress(){
    this.address = this.streetAddress + ", " + this.city + ", " + this.state + " " + this.zip;
    this.newAddressEvent.emit(this.address);
  }

  
  ngOnInit(): void {
  }

  reset(){
    this.userService.getCurrentUser(this.token).subscribe(
      response => {
        this.userId = response.userId;
        this.sub = response.sub;
        this.first = response.firstName;
        this.last = response.lastName;
        this.profilePic = response.profilePic;
        this.imageFileUrl = response.profilePic;
        this.fileInput.nativeElement.value = '';
        this.bio = response.bio;
        this.address = response.address;
        var splitted = response.address?.split(",",3); 
        var temp = splitted?.pop()?.split(" ");
        this.zip = temp?.pop();
        this.state = temp?.pop();
        this.city = splitted?.pop();
        this.streetAddress = splitted?.pop();
        
      }
    )
  }


//these variables will be dynamically assigned using two way databinding which implements NgModel to get form inputs from html
//sets the user info to the update values
  update(): void {
    //user new user object to replace existing object 
    this.user = {
      userId: this.userId,
      sub: this.sub,
      firstName: this.first,
      lastName: this.last,
      profilePic: this.profilePic,
      bio: this.bio,
      address: this.address,
      trips: this.trips,
      friends: this.friends
    }

    const formData = new FormData();

    formData.append('user', new Blob([JSON.stringify(this.user)], {
      type: 'application/json'
    }));

    if (this.imageFile) formData.append('file', this.imageFile, "a file");
    

    //calls user service to update existing user
    this.userService.update(formData,this.token).subscribe(
      response => {
        console.log(response);
        this.response = response;
      },error => {
        console.log(error.error);
        this.response = error.error.message;
      }

    )
    }

    selectImage(event: any) {
      const file = event.target.files[0];
      this.imageFile = file;
      const fileReader = new FileReader();
  
      fileReader.onload = () => {
        return this.imageFileUrl = fileReader.result;
      }
  
      fileReader.readAsDataURL(file);
    }
  }
