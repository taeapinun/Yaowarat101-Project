import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from './cart';
import { CartService } from './cart.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { forEach } from '@angular/router/src/utils/collection';
import { Title } from '@angular/platform-browser'
import { LinkApi } from '../app.link-api';
import { Alert } from 'selenium-webdriver';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import swal from 'sweetalert2';

@Component({
  selector: 'my-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartsComponent implements OnInit {
  user: User;
  carts: Cart[];
  selectedCart: Cart;
  addingCart = false;
  error: any;
  showNgFor = false;
  totalPrice: number;
  picApi = LinkApi.pic;
  userName = undefined;
  userRole = undefined;
  userId = undefined;


  constructor(private router: Router, private cartService: CartService, private titleService: Title, private userService: UserService, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Yaowarat101 - Carts');
    this.userName = this.storage.get('userName');
    this.userRole = this.storage.get('userRole');
    if (this.userRole == 'admin') {
      this.userId = '1 or 1=1';
      this.getUserAdmin(this.storage.get('userId'))
      
    }
    else {
      this.userId = this.storage.get('userId');
      this.getUser()
      
    }
    this.getCarts(this.userId);
    this.user = new User;
    
  }

  getCarts(id: number): void {
    this.cartService
      .getCarts(id)
      .subscribe(
        carts => (this.carts = carts, this.calTotalPrice()),
        error => (this.error = error)
      )
    
  }

  getUser(): void {
    this.userService.getUser(this.userId).subscribe(user => (this.user = user[0]), error => (console.log(error)));
  }

  getUserAdmin(id: number): void {
    this.userService.getUser(id).subscribe(user => (this.user = user[0]), error => (console.log(error)));
  }

  addCart(): void {
    if (this.addingCart == false) {
      this.addingCart = true;
      this.selectedCart = null;
    }
    else {
      this.addingCart = false;
    }
  }

  close(savedCart: Cart): void {
    this.addingCart = false;
    if (savedCart) {
      this.getCarts(this.userId);
    }
  }

  deleteCart(cart: Cart): void {
    // console.log(cart)
    // console.log(this.userId)
    this.cartService.deleteCart(cart, this.userId).subscribe();
    this.getCarts(this.userId);
  }



  onSelect(cart: Cart): void {
    this.selectedCart = cart;
    this.addingCart = false;
    this.router.navigate(['/detail', this.selectedCart.p_Id]);
  }

  calTotalPrice(): void {
    var totalPrice = 0;
    this.carts.forEach(cart => {
      totalPrice += (cart.p_Price * Number(cart.p_Amount))
    });
    this.totalPrice = totalPrice;
  }


  async proceedCheckout() {
    // console.log(this.carts)
    // console.log(this.user)
    // console.log(this.carts);
    // console.log(this.user);
    // console.log(this.userId);
    // console.log(this.totalPrice)
    if (this.userId != undefined) {
      this.cartService.proceedAddtoCart(this.carts, this.user, this.totalPrice).subscribe(data => {
        // console.log("this.user = " +  this.user.u_Id);
        this.cartService.proceedAddtoCart2(this.carts, this.user).subscribe(res => {
          // console.log("this.carts = " +  this.carts);
          // this.cartService.deleteCartAll(this.userId).subscribe(resp => {
          //   console.log(resp);
          //   this.getCarts(this.userId);
          //   alert("proceed to checkout successfully");
          // });


        })
      })



      this.cartService.deleteCartAll(this.userId).subscribe(async res => {
        await swal({
          title: 'คำสั่งซื้อ',
          text: 'ยืนยันคำสั่งซื้อสำเร็จ',
          type: 'success',
          showConfirmButton: true
        })
        window.location.reload(true);
        setTimeout(() => {
          window.location.href = '/#/order';
        }, 1000);
        
       
       
      })

    }
    else {
      await swal({
        title: 'เข้าสู่ระบบ',
        text: 'โปรดเข้าสู่ระบบ',
        type: 'error',
        showConfirmButton: true
      })
    }


    // this.cartService.deleteCart(cart).subscribe(deldata => {
    //   console.log(deldata);
    // })


  }

  updateUser(): void{
    console.log(this.user)
    this.cartService.updateUser(Number(this.user.u_Id), this.user).subscribe();

  }

  test(){
    console.log(this.carts.length)
  }
}
