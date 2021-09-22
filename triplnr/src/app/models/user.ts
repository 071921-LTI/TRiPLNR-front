
//user model that matches user model in back end
export interface User {
    userId?: number;
    sub?:string;
    firstName?:string;
    lastName?:string;
    profilePic?:string;
    bio?:string;
    address?:string;
    trips?: any;
    friends?: any;
}
