import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {


  constructor() { }

  imageSrc = 'https://i.imgur.com/AmgUi4c.jpegs'
  imageAlt = 'logo'

  ngOnInit(): void {
  }

}
