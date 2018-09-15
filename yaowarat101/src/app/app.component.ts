import { Component, Input, OnInit, Inject } from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'my-root',
  template: `
    <h1>{{title}}</h1>
    <div class="header-bar"></div>
    <nav>
    <a routerLink="/" routerLinkActive="active">Home</a>
      <a routerLink="/products" routerLinkActive="active">Products</a>
      <a routerLink="/carts" routerLinkActive="active">Carts</a>
      <a *ngIf="userName == null" routerLink="/user" routerLinkActive="active">Login</a>
      <a *ngIf="userName != null" routerLink="/user" routerLinkActive="active">{{userName}}</a>
      <a *ngIf="userName != null" (click)="logout()" routerLinkActive="active">Logout</a>
      
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService){}
  userName: string;
  title = 'Yaowarat101';

  ngOnInit(){
    this.userName = this.storage.get('userName');
  }

  logout(): void{
    this.userName = null;
    this.storage.remove('userName');
    window.location.reload();
  }
}


