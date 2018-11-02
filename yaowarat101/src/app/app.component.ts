import { Component, Input, OnInit, Inject } from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { LinkApi } from './app.link-api';
import { FacebookService, InitParams} from 'ngx-facebook';
import swal from 'sweetalert2';
import { AppService } from './app.service';

@Component({
  selector: 'my-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, private fb: FacebookService, private appService: AppService) {
   }
  userName: string;
  userRole: string;
  userId: string;
  userPoint: string;
  linkApi = LinkApi.link;
  picApi = LinkApi.pic;
  goldPrice: any;

  ngOnInit() {

    this.appService.getGoldPrice().subscribe(data => {
      this.goldPrice = data
      // console.log(this.goldPrice)
    });
    
    this.userName = this.storage.get('userName');
    this.userRole = this.storage.get('userRole');
    this.userId = this.storage.get('userId');
    this.userPoint = this.storage.get('userPoint');
    let element: HTMLElement = document.getElementById('modalActivate') as HTMLElement;
    element.click();

    let initParams: InitParams = {
      xfbml: true,
      version: "v2.8"
    };
    // console.log(this.goldPrice);
    this.fb.init(initParams);
  }

  async logout() {
    this.userName = null;
    this.storage.remove('userName');
    this.storage.remove('userId');
    this.storage.remove('userRole');
    this.storage.remove('userPoint');

    await swal({
      position: 'top-end',
      title: 'ออกจากระบบ',
      text: 'ออกจากระบบสำเร็จ',
      type: 'error',
      showConfirmButton: true
    })
    window.location.reload();
  }

  Btnreload(): void{
    window.location.reload();
  }


}







