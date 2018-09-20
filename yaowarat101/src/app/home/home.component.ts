import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
const URL = 'http://192.168.1.198:8082/api/upload';



@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private titleService: Title) { }



  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });





  ngOnInit() {
    this.titleService.setTitle('Yaowarat101 - Home');







    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      alert('File uploaded successfully');
    };


  }

}
