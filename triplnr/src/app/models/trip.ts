import { SystemJsNgModuleLoader } from "@angular/core";
import { Timestamp } from "rxjs/internal/operators/timestamp";
import { User } from "./user";

export interface Trip {

    

    tripId?: number;
    destination?: String;
    origin?: String;
    tripName?: String;
    manager?: User;
    stops?: null;
    passengers?: any;
    startTime?: null;
    endTime?: null;



}
