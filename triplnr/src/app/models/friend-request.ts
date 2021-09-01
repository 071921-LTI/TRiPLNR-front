import { User } from "./user";

export interface FriendRequest {

    requestId?: number;
    from?:User;
    to?:User;
}
