import { Component, OnInit, Inject } from '@angular/core';
import { LinkApi } from '../app.link-api';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'my-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {
  picApi = LinkApi.pic;
  linkApi = LinkApi.link;

  userName = undefined;
  userRole = undefined;
  userId = undefined;

  editorConfig = {
    "editable": true,
    "spellcheck": true,
    "height": "auto",
    "minHeight": "20",
    "width": "auto",
    "minWidth": "0",
    "translate": "yes",
    "enableToolbar": true,
    "showToolbar": true,
    "placeholder": "Enter text here...",
    "imageEndPoint": "",
    "toolbar": [
        ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
        ["fontSize"],
        ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
        ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
        ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
        ["link", "unlink", "image", "video"]
    ]
  };

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService) { }

  ngOnInit(): void {
    this.userName = this.storage.get('userName');
    this.userRole = this.storage.get('userRole');
    this.userId = this.storage.get('userId');
  }

}
