import { SystemJsNgModuleLoader } from "@angular/core";
import { Timestamp } from "rxjs/internal/operators/timestamp";
import { User } from "./user";

//trip model that matches trip model in back end
export interface Trip {
    tripId?: number;
    destination?: String;
    origin?: String;
    tripName?: String;
    manager?: User;
    stops?: null;
    passengers?: any;
    startTime?: string;
    endTime?: null;
    startTimeString?:string;
}
