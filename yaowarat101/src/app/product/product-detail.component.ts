import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from './product';
import { ProductService } from './product.service';
import { CartService } from '../cart/cart.service';

import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { SESSION_STORAGE, WebStorageService } from "angular-webstorage-service";
import { LinkApi } from '../app.link-api';


@Component({
  selector: 'my-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() products: Product[];
  @Input() product: Product;
  @Input() productInput: Product; 
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here
  title = '';
  urlUpload = LinkApi.link + 'upload';
  picApi = LinkApi.pic;
  textAfterSave = '';
  uploader: FileUploader = new FileUploader({ url: this.urlUpload, itemAlias: 'photo' });
  userRole = undefined;


  constructor(
    private productService: ProductService, private route: ActivatedRoute, private cartService: CartService,
    @Inject(SESSION_STORAGE) private storage: WebStorageService) { }

  ngOnInit(): void {
    this.userRole = this.storage.get("userRole");
    console.log(this.userRole);
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.navigated = true;
        this.productService.getProduct(id).subscribe(product => (this.product = product, this.title = product.p_Name));
      } else {
        this.navigated = false;
        this.title = '';
        this.product = new Product();
        this.textAfterSave = '';
      }
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
  }

  onSelect(id): void {
    console.log("test")
  }


  save(): void {
    console.log(this.product)
    this.productService.save(this.product).subscribe(product => {
      this.product = product;
      this.textAfterSave = 'Add product successfully';
      this.uploader.uploadAll();
      this.close.emit(null);
      window.location.reload();
    }, error => (this.error = error));
  }

  goBack(savedProduct: Product = null): void {
    this.close.emit(savedProduct);
    if (this.navigated) {
      window.history.back();
    }
  }

  // addtoCart(product: Product): void {
  //   console.log(product)
  //   this.cartService.post(product).subscribe(res => {
  //     console.log(res);
  //   })
  // }

}
