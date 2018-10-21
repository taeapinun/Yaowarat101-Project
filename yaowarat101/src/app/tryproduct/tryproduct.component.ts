import { Component, OnInit, Inject } from "@angular/core";
import { LinkApi } from "../app.link-api";
import { ActivatedRoute, Params } from '@angular/router'
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: "my-tryproduct",
  templateUrl: "./tryproduct.component.html",
  styleUrls: ["./tryproduct.component.scss"]
})
export class TryproductComponent implements OnInit {
  picApi = LinkApi.link;
  Deg1 = 0;
  slider1Enable = false;
  Deg2 = 0;
  slider2Enable = false;
  Deg3 = 0;
  slider3Enable = false;
  Deg4 = 0;
  slider4Enable = false;
  Deg5 = 0;
  slider5Enable = false;

  listTryproduct = []

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService) {}

  ngOnInit() {
    this.listTryproduct = this.storage.get('tryproduct')
    console.log(this.listTryproduct)
    

    // this.route.params.subscribe(data => {
    //   console.log(data)
    // })
    // alert('กำลังอยู่ในการพัฒนา v0.0.1');
  }

  rotateImage(name: number, deg: number): void {
    console.log(this.listTryproduct)
    let element: HTMLElement = document.getElementById(
      String(name)
    ) as HTMLElement;

    if (name === 1) {
      element.style.transform = 'rotate(' + this.Deg1 + 'deg)';
    }
    if (name === 2) {
      element.style.transform = 'rotate(' + this.Deg2 + 'deg)';
    }
    if (name === 3) {
      element.style.transform = 'rotate(' + this.Deg3 + 'deg)';
    }

    if (name === 4) {
      element.style.transform = 'rotate(' + this.Deg4 + 'deg)';
    }

    if (name === 5) {
      element.style.transform = 'rotate(' + this.Deg5 + 'deg)';
    }
  }

  showSlider(name: number): void {
    if (name === 1) {
      if (this.slider1Enable === false) {
        this.slider1Enable = true;
      } else {
        this.slider1Enable = false;
      }
    }

    if (name === 2) {
      if (this.slider2Enable === false) {
        this.slider2Enable = true;
      } else {
        this.slider2Enable = false;
      }
    }

    if (name === 3) {
      if (this.slider3Enable === false) {
        this.slider3Enable = true;
      } else {
        this.slider3Enable = false;
      }
    }

    if (name === 4) {
      if (this.slider4Enable === false) {
        this.slider4Enable = true;
      } else {
        this.slider4Enable = false;
      }
    }

    if (name === 5) {
      if (this.slider5Enable === false) {
        this.slider5Enable = true;
      } else {
        this.slider5Enable = false;
      }
    }
  }


  readURL(input) {
    console.log(input.srcElement.files)
    if (input.srcElement.files && input.srcElement.files[0]) {
      const reader = new FileReader()
      reader.onloadend = (e) => {
        const element: HTMLImageElement = document.getElementById('ImageForTest') as HTMLImageElement;
        element.src = reader.result.toString()
        element.style.height = '50vw'
      }
      reader.readAsDataURL(input.srcElement.files[0])
    }
  }
}
