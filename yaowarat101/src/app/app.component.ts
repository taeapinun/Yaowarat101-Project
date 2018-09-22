import { Component, Input, OnInit, Inject } from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { LinkApi } from './app.link-api';

@Component({
  selector: 'my-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  userName: string;
  linkApi = LinkApi.link;
  picApi = LinkApi.pic;

  ngOnInit() {
    this.userName = this.storage.get('userName');
  }

  logout(): void {
    this.userName = null;
    this.storage.remove('userName');
    window.location.reload();
  }

}


