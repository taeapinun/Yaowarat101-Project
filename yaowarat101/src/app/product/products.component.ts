import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from './product';
import { ProductService } from './product.service';
// import { SearchProductFilterPipe } from './searchProductFilter.pipe';

@Component({
  selector: 'my-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  selectedProduct: Product;
  addingProduct = false;
  error: any;
  showNgFor = false;

  constructor(private router: Router, private productService: ProductService) {}

  getProducts(): void {
    this.productService
      .getProducts()
      .subscribe(
        products => (this.products = products, console.log(this.products)),
        error => (this.error = error)
      )
  }

  addProduct(): void {
    if(this.addingProduct == false) {
      this.addingProduct = true;
      this.selectedProduct = null;
    }
    else{
      this.addingProduct = false;
    }
  }

  close(savedProduct: Product): void {
    this.addingProduct = false;
    if (savedProduct) {
      this.getProducts();
    }
  }

  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product).subscribe(res => {
      this.products = this.products.filter(h => h !== product);
      if (this.selectedProduct === product) {
        this.selectedProduct = null;
      }
    }, error => (this.error = error));
  }

  ngOnInit(): void {
    this.getProducts();
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
    this.addingProduct = false;
    this.router.navigate(['/detail', this.selectedProduct.p_Id]);
  }

  // searchTextChange(text: any): void{
  //   // this.products = this.searchProductFilter.transform(this.products, text);
  //   console.log(this.products);
  // }
}
