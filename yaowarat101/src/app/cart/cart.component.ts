import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from './cart';
import { CartService } from './cart.service';

@Component({
  selector: 'my-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartsComponent implements OnInit {
  carts: Cart[];
  selectedCart: Cart;
  addingCart = false;
  error: any;
  showNgFor = false;

  constructor(private router: Router, private cartService: CartService) {}

  getCarts(): void {
    this.cartService
      .getCarts()
      .subscribe(
        carts => (this.carts = carts, console.log(this.carts)),
        error => (this.error = error)
      )
  }

  addCart(): void {
    if(this.addingCart == false) {
      this.addingCart = true;
      this.selectedCart = null;
    }
    else{
      this.addingCart = false;
    }
  }

  close(savedCart: Cart): void {
    this.addingCart = false;
    if (savedCart) {
      this.getCarts();
    }
  }

  deleteCart(cart: Cart): void {
    this.cartService.deleteCart(cart).subscribe(res => {
      this.carts = this.carts.filter(h => h !== cart);
      if (this.selectedCart === cart) {
        this.selectedCart = null;
      }
    }, error => (this.error = error));
  }

  ngOnInit(): void {
    this.getCarts();
  }

  onSelect(cart: Cart): void {
    this.selectedCart = cart;
    this.addingCart = false;
    this.router.navigate(['/detail', this.selectedCart.p_Id]);
  }
}
