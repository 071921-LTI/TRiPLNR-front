import { first } from "rxjs/operators";

export class User {

    constructor(userId:number, username:String, password:String, firstName:String, lastName:String) { 
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = null;
        this.trips = null;
    }

    

    userId : number;
    username : String;
    password : String;
    firstName : String;
    lastName : String;
    //address
    address : null;
    //trips
    trips : null;



}
