import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './user';
import { Headers } from '@angular/http';

@Injectable()
export class UserService{
  private usersUrl = '/api/user'; // URL to web api

  constructor(private http: HttpClient) { }


  getUsers() {
    return this.http
      .get<User[]>(this.usersUrl + '/email')
      .pipe(map(data => data), catchError(this.handleError));
  }

  save(user: User): Observable<User> {
    // if (user.p_Id) {
    //   console.log("already have this product");
    //   return this.http.put<User>(this.productsUrl, product);
    // }
    return this.http.post<User>(this.usersUrl, user);
  }

  // deleteProduct(product: Product) {
  //   const options = {
  //     headers: new HttpHeaders({'Content-Type': 'application/json'})
  //   }

  //   const url = `${this.productsUrl}/${product.p_Id}`

  //   return this.http.delete<Product>(url, options);
  // }

  // Add new Product
  // private post(product: Product) {
  //   const headers = new Headers({
  //     'Content-Type': 'application/json'
  //   });

  //   return this.http
  //     .post<Product>(this.productsUrl, product)
  //     .pipe(catchError(this.handleError));
  // }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
