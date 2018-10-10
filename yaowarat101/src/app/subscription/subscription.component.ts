import { Component, OnInit } from '@angular/core';
import { LinkApi } from '../app.link-api';

@Component({
  selector: 'my-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  linkApi = LinkApi.link;
  picApi = LinkApi.pic;

  constructor() { }

  ngOnInit() {
  }

}
