import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
// import { Hero } from './hero';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'my-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.navigated = true;
        this.productService.getProduct(id).subscribe(product => (this.product = product));
      } else {
        this.navigated = false;
        this.product = new Product();
      }
    });
  }

  // save(): void {
  //   this.productService.save(this.product).subscribe(product => {
  //     this.product = product; // saved hero, w/ id if new
  //     this.goBack(product);
  //   }, error => (this.error = error)); // TODO: Display error message
  // }

  // goBack(savedProduct: Product = null): void {
  //   this.close.emit(savedProduct);
  //   if (this.navigated) {
  //     window.history.back();
  //   }
  // }
}
