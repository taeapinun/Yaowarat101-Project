import { Component, OnInit } from '@angular/core';
import { LinkApi } from '../app.link-api';

@Component({
  selector: 'my-redeemreward',
  templateUrl: './redeemreward.component.html',
  styleUrls: ['./redeemreward.component.scss']
})
export class RedeemrewardComponent implements OnInit {
  linkApi = LinkApi.link;
  picApi = LinkApi.pic;

  constructor() { }

  ngOnInit() {
  }

}
