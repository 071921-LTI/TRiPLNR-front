import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import { Trip } from 'src/app/models/trip';

@Injectable({ providedIn: 'root' })
export class CommonService {
    private user = new Subject<User>(); //need to create a subject
    private trip = new Subject<Trip>();

    sendFriend(friends: User) { //the component that wants to update something, calls this fn
      this.user.next({ friends }); //next() will feed the value in Subject
    }

    getFriend(): Observable<any> { //the receiver component calls this function 
      return this.user.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
    }

    sendTrip(passengers: Trip) {
      this.trip.next({ passengers });
    }

    getTrip(): Observable<any> {
      return this.trip.asObservable();
    }
}
