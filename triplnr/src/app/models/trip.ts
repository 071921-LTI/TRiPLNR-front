import { User } from "./user";

//trip model that matches trip model in back end
export interface Trip {
    tripId?: number;
    destination?: String;
    origin?: String;
    tripName?: String;
    manager?: User;
    stops?: any;
    passengers?: any;
    startTime?: string;
    endTime?: null;
    startTimeString?:string;
    spotify?: string;
    snacks?: User;
    navigator?: User;
    music?: User;
}
