import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Cart } from './cart';
import { Product } from '../product/product'
import { Headers } from '@angular/http';
import { LinkApi } from '../app.link-api'

@Injectable()
export class CartService {
  private cartsUrl = this.linkapi.link + 'carts/1'; // URL to web api

  constructor(private http: HttpClient, private linkapi: LinkApi) {}
  getCarts() {
    return this.http
      .get<Cart[]>(this.cartsUrl)
      .pipe(map(data => data), catchError(this.handleError));
  }

  getCart(id: number): Observable<Cart> {
    return this.getCarts().pipe(
      map(carts => carts.find(cart => cart.p_Id === id))
    );
  }

  save(cart: Cart): Observable<Cart> {
    if (cart.p_Id) {
      console.log("already have this cart");
      return this.http.put<Cart>(this.cartsUrl, cart);
    }
    return this.http.post<Cart>(this.cartsUrl, cart);
  }

  deleteCart(cart: Cart) {
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    const url = `${this.cartsUrl}/${cart.p_Id}`

    return this.http.delete<Cart>(url, options);
  }

  // Add new Cart
  post(product: Product) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post<Cart>(this.cartsUrl, product)
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
