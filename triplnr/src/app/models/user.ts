
//user model that matches user model in back end
export interface User {
    userId?: number;
    sub?: String;
    firstName?: String;
    lastName?: String;
    address?: String;
    trips?: any;
    friends?: any;
}
