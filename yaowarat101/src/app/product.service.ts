import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// import { Hero } from './hero';
import { Product } from './product';

@Injectable()
export class ProductService {
  private productsUrl = 'http://localhost:8081/products'; // URL to web api

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http
      .get<Product[]>(this.productsUrl)
      .pipe(map(data => data), catchError(this.handleError));
  }

  // getHeroes() {
  //   return this.http
  //     .get<Hero[]>(this.heroesUrl)
  //     .pipe(map(data => data), catchError(this.handleError));
  // }

  getProduct(id: number): Observable<Product> {
    return this.getProducts().pipe(
      map(products => products.find(product => product.p_Id === id))
    );
  }

  save(product: Product) {
    if (product.p_Id) {
      // return this.put(product);
      return console.log("already have this product")
    }
    return this.post(product);
  }

  // delete(hero: Hero) {
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');

  //   const url = `${this.heroesUrl}/${hero.id}`;

  //   return this.http.delete<Hero>(url).pipe(catchError(this.handleError));
  // }

  // Add new Product
  private post(product: Product) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post<Product>(this.productsUrl, product)
      .pipe(catchError(this.handleError));
  }

  // Update existing Hero
  // private put(hero: Hero) {
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');

  //   const url = `${this.heroesUrl}/${hero.id}`;

  //   return this.http.put<Hero>(url, hero).pipe(catchError(this.handleError));
  // }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
