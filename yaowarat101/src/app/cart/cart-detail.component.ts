import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Cart } from './cart';
import { CartService } from './cart.service';

@Component({
  selector: 'my-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {
  @Input() cart: Cart;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here
  title = '';

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.navigated = true;
        this.cartService.getCart(id).subscribe(cart => (this.cart = cart, this.title = cart.p_Name));
      } else {
        this.navigated = false;
        this.title = 'Add New Cart';
        this.cart = new Cart();
      }
    });
  }

  save(): void {
    this.cartService.save(this.cart).subscribe(cart => {
      this.cart = cart;
      this.goBack(cart);
    }, error => (this.error = error));
  }

  goBack(savedCart: Cart = null): void {
    this.close.emit(savedCart);
    if (this.navigated) {
      window.history.back();
    }
  }
}
