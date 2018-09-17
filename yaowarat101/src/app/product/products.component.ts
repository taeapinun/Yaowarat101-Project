import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from './product';
import { ProductService } from './product.service';
import { CartService } from '../cart/cart.service';
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
  inPage = 1;
  iteminPage = 10;
  maxPage = 0;
  pageArray: number[];

  constructor(private router: Router, private productService: ProductService, private cartService: CartService) {}

  getProducts(): void {
    this.productService
      .getProducts()
      .subscribe(
        products => (
          this.products = products,
          this.getPageArray()
          ),
        error => (this.error = error)
      )
      
      
  }

  getPageArray(): void{
    this.pageArray = [];
    this.maxPage = this.products.length / this.iteminPage;
    this.pageArray.push(1);
    for (let index = 2; index <= this.maxPage; index++) {
      this.pageArray.push(index);
    }
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

  selectChange(): void{
    this.getPageArray()
  }

  changePage(page: number): void{
    if(page > 0 && page < this.maxPage){
      this.inPage = page;
    }
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
    this.addingProduct = false;
    this.router.navigate(['/detail', this.selectedProduct.p_Id]);
  }

  addtoCart(product: Product): void {
    console.log(product)
    this.cartService.post(product).subscribe(res => {
      console.log(res);
    })
  }

  // searchTextChange(text: any): void{
  //   // this.products = this.searchProductFilter.transform(this.products, text);
  //   console.log(this.products);
  // }
}
