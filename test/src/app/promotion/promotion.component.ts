import { Component, OnInit } from '@angular/core';
import { LinkApi } from '../app.link-api';

@Component({
  selector: 'my-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {
  picApi = LinkApi.pic;
  linkApi = LinkApi.link;

  constructor() { }

  ngOnInit() {
  }

}
