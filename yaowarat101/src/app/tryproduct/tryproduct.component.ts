import { Component, OnInit } from '@angular/core';
import { LinkApi } from '../app.link-api';

@Component({
  selector: 'my-tryproduct',
  templateUrl: './tryproduct.component.html',
  styleUrls: ['./tryproduct.component.scss']
})
export class TryproductComponent implements OnInit {
  picApi = LinkApi.link
  necklaceDeg = 0;
  sliderNecklaceEnable = false
  ringDeg = 0;
  sliderRingEnable = false
  bangleDeg = 0;
  sliderBangleEnable = false
  earringDeg = 0;
  sliderEarringEnable = false
  braceletsDeg = 0;
  sliderBraceletsEnable = false


  constructor() { }

  ngOnInit() {
    alert("กำลังอยู่ในการพัฒนา v0.0.1");
  }

  rotateImage(name: string, deg: number): void {
    let elementNecklace: HTMLElement = document.getElementById(name) as HTMLElement
    if(name == 'necklace') elementNecklace.style.transform = 'rotate(' + this.necklaceDeg + 'deg)'
    if(name == 'earring') elementNecklace.style.transform = 'rotate(' + this.earringDeg + 'deg)'
    if(name == 'bracelets') elementNecklace.style.transform = 'rotate(' + this.braceletsDeg + 'deg)'
    if(name == 'ring') elementNecklace.style.transform = 'rotate(' + this.ringDeg + 'deg)'
    if(name == 'bangle') elementNecklace.style.transform = 'rotate(' + this.bangleDeg + 'deg)'
  }

  showSlider(name: string): void {
    if (name == 'necklace') {
      if (this.sliderNecklaceEnable == false) {
        this.sliderNecklaceEnable = true
      }
      else {
        this.sliderNecklaceEnable = false
      }
    }

    if (name == 'earring') {
      if (this.sliderEarringEnable == false) {
        this.sliderEarringEnable = true
      }
      else {
        this.sliderEarringEnable = false
      }
    }

    if (name == 'bangle') {
      if (this.sliderBangleEnable == false) {
        this.sliderBangleEnable = true
      }
      else {
        this.sliderBangleEnable = false
      }
    }

    if (name == 'bracelets') {
      if (this.sliderBraceletsEnable == false) {
        this.sliderBraceletsEnable = true
      }
      else {
        this.sliderBraceletsEnable = false
      }
    }

    if (name == 'ring') {
      if (this.sliderRingEnable == false) {
        this.sliderRingEnable = true
      }
      else {
        this.sliderRingEnable = false
      }
    }

  }

}
