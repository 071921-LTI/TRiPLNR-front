import { Trip } from "./trip";
import { User } from "./user";

export interface PassengerRequest {

    requestId?: number;
    from?:User;
    to?:User;
    trip?:Trip;
}