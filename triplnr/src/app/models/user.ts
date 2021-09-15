
//user model that matches user model in back end
export interface User {
    userId?: number;
    sub?: String;
    firstName?: String;
    lastName?: String;
    profilePic?: String;
    bio?: String;
    address?: String;
    trips?: any;
    friends?: any;
}
