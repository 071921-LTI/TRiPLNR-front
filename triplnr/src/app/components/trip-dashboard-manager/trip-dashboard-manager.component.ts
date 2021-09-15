import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip-dashboard-manager',
  templateUrl: './trip-dashboard-manager.component.html',
  styleUrls: ['./trip-dashboard-manager.component.css']
})
export class TripDashboardManagerComponent implements OnInit {
  title:String = "TripDashboardManager";
  constructor() { }

  ngOnInit(): void {
  }

}
