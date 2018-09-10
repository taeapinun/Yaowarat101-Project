import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  products: Product[] = [];

  constructor(
    private router: Router,
    private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products.slice(1, 5));
  }

  gotoDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
