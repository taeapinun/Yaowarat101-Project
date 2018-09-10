import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'my-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  heroes: Hero[];
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

  // getHeroes(): void {
  //   this.heroService
  //     .getHeroes()
  //     .subscribe(
  //       heroes => (this.heroes = heroes, console.log(this.heroes)),
  //       error => (this.error = error)
  //     )
  // }

  addProduct(): void {
    this.addingProduct = true;
    this.selectedProduct = null;
  }

  // close(savedHero: Hero): void {
  //   this.addingHero = false;
  //   if (savedHero) {
  //     this.getHeroes();
  //   }
  // }

  // deleteHero(hero: Hero, event: any): void {
  //   event.stopPropagation();
  //   this.heroService.delete(hero).subscribe(res => {
  //     this.heroes = this.heroes.filter(h => h !== hero);
  //     if (this.selectedHero === hero) {
  //       this.selectedHero = null;
  //     }
  //   }, error => (this.error = error));
  // }

  ngOnInit(): void {
    this.getProducts();
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
    this.addingProduct = false;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedProduct.p_Id]);
  }
}
