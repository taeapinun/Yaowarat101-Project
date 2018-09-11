import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from './product';
import { ProductService } from './services/product.service';

@Component({
  selector: 'my-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./css/product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here
  title = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.navigated = true;
        this.productService.getProduct(id).subscribe(product => (this.product = product, this.title = product.p_Name));
      } else {
        this.navigated = false;
        this.title = 'Add New Product';
        this.product = new Product();
      }
    });
  }

  save(): void {
    this.productService.save(this.product).subscribe(product => {
      this.product = product;
      this.goBack(product);
    }, error => (this.error = error));
  }

  goBack(savedProduct: Product = null): void {
    this.close.emit(savedProduct);
    if (this.navigated) {
      window.history.back();
    }
  }
}
