import { Component, OnInit } from '@angular/core';
import { LinkApi } from '../app.link-api';

@Component({
  selector: 'my-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  picApi = LinkApi.pic
  linkApi = LinkApi.link

  constructor() { }

  ngOnInit() {
  }

}
