
//user model that matches user model in back end
export interface User {
    userId?: number;
    username?: String;
    password?: String;
    firstName?: String;
    lastName?: String;
    address?: String;
    trips?: null;
    friends?: null;
}
