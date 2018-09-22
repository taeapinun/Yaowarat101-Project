import { Component, OnInit } from '@angular/core';
import { LinkApi } from '../app.link-api';

@Component({
  selector: 'my-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  linkApi = LinkApi.link;
  picApi = LinkApi.pic;

  constructor() { }

  ngOnInit() {
  }

}
