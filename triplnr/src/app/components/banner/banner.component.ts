import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {


  constructor() { }
  imageSrc = 'https://i.imgur.com/8MwN8jI.jpg'
  //link to project logo
  imageAlt = 'logo'

  ngOnInit(): void {
  }

}
