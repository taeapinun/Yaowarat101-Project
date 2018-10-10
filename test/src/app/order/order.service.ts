import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, OnInit } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Order } from './order';
import { Headers } from '@angular/http';
import { LinkApi } from '../app.link-api'
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Injectable()
export class OrderService implements OnInit{
  private ordersUrl = LinkApi.link + 'checkout/'; // URL to web api

  userName = undefined;
  userRole = undefined;
  userId = undefined;

  constructor(private http: HttpClient, @Inject(SESSION_STORAGE) private storage: WebStorageService) {}
  
  ngOnInit(){
    this.userName = this.storage.get('userName');
    this.userRole = this.storage.get('userRole');
    if(this.userRole == 'admin'){
      this.userId = '1 or 1=1';
    }
    else{
      this.userId = this.storage.get('userId');
    }
  }


  getOrders(id: number) {
    return this.http
      .get<Order[]>(this.ordersUrl + id)
      .pipe(map(data => data), catchError(this.handleError));
  }

  getOrderList(id: number) {
    return this.http
      .get<Order[]>(this.ordersUrl + 'orders/' + id)
      .pipe(map(data => data), catchError(this.handleError));
  }

  updateOrderPayment(payment: any ,statustext: string, id:number) {
    var param = {
      method: payment.method,
      date: payment.date,
      time: payment.time,
      amount: payment.amount,
      status: statustext
    }
    // console.log(param)
    return this.http.post(LinkApi.link + "orderupdate/" + id, param).subscribe();
    // return this.http
    //   .get<Order[]>(this.ordersUrl + 'orders/' + id)
    //   .pipe(map(data => data), catchError(this.handleError));
  }

  updateStatus(statustext: string, id:number) {
    // console.log(param)
    var param = {
      status: statustext
    }
    return this.http.post(LinkApi.link + "orderupdatestatus/" + id, param).subscribe();
    // return this.http
    //   .get<Order[]>(this.ordersUrl + 'orders/' + id)
    //   .pipe(map(data => data), catchError(this.handleError));
  }

  updateUserPoint(point: number, id:number) {
    // console.log(param)
    var param = {
      u_Point: point
    }
    return this.http.post(LinkApi.link + "userupdatepoint/" + id, param).subscribe();
    // return this.http
    //   .get<Order[]>(this.ordersUrl + 'orders/' + id)
    //   .pipe(map(data => data), catchError(this.handleError));
  }


  // getOrder(id: number): Observable<Order> {
  //   return this.getOrders().pipe(
  //     map(orders => orders.find(order => order.p_Id === id))
  //   );
  // }

//   save(cart: Cart): Observable<Cart> {
//     if (cart.p_Id) {
//       console.log("already have this cart");
//       return this.http.put<Cart>(this.cartsUrl, cart);
//     }
//     return this.http.post<Cart>(this.cartsUrl, cart);
//   }

//   deleteCart(cart: Cart) {
//     const options = {
//       headers: new HttpHeaders({'Content-Type': 'application/json'})
//     }

//     const url = `${this.cartsUrl}/${cart.p_Id}`

//     return this.http.delete<Cart>(url, options);
//   }

  // Add new Cart
//   post(product: Product) {
//     const headers = new Headers({
//       'Content-Type': 'application/json'
//     });

//     return this.http
//       .post<Cart>(this.cartsUrl, product)
//       .pipe(catchError(this.handleError));
//   }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
