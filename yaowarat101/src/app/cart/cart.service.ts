import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Cart } from './cart';
import { User } from '../user/user';
import { Product } from '../product/product'
import { Headers } from '@angular/http';
import { LinkApi } from '../app.link-api'

@Injectable()
export class CartService {
  private cartsUrl = LinkApi.link; // URL to web api

  constructor(private http: HttpClient) {}
  getCarts(id: number) {
    return this.http
      .get<Cart[]>(this.cartsUrl + 'carts/' + id)
      .pipe(map(data => data), catchError(this.handleError));
  }

  // getCart(id: number): Observable<Cart> {
  //   return this.getCarts().pipe(
  //     map(carts => carts.find(cart => cart.p_Id === id))
  //   );
  // }

  save(cart: Cart, id:number): Observable<Cart> {
    if (cart.p_Id) {
      console.log("already have this cart ");
      return this.http.put<Cart>(this.cartsUrl + 'carts/' + id, cart);
    }
    return this.http.post<Cart>(this.cartsUrl + 'carts/' + id, cart);
  }

  deleteCart(cart: Cart, id:number) {

    return this.http.get(this.cartsUrl + 'cartsdelete/' + id +'/' + cart.p_Id).pipe(catchError(this.handleError));
  }

  deleteCartAll(id:number) {

    return this.http.get(this.cartsUrl + 'cartsdeleteall/' + id).pipe(catchError(this.handleError));
  }

  updateUser(id:number, user: User) {

    return this.http.post(this.cartsUrl + 'useredit/id/' + id, user).pipe(catchError(this.handleError));
  }

  // Add new Cart
  post(product: Product, id:number) {
    // console.log("add cart" + id)
    // console.log(product)
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post<Cart>(this.cartsUrl + 'carts/' + id, product)
      .pipe(catchError(this.handleError));
  }

  //proceed add to cart
  proceedAddtoCart(cart: Cart[], user: User, totalPrice: number) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    console.log(user)
    var param = {
      u_Address: user.u_Address,
      u_Id: user.u_Id,
      u_Name: user.u_Name,
      u_Tel: user.u_Tel,
      o_Totalprice: totalPrice
    }
    
    return this.http.post(LinkApi.link + 'checkout/order/', param);

  }

  proceedAddtoCart2(cart: Cart[], user: User) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    console.log(cart)
    return this.http.post(LinkApi.link + 'checkout/orderproduct/', cart);
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
