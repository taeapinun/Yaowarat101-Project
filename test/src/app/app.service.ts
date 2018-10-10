import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Headers } from '@angular/http';
import { LinkApi } from './app.link-api'

@Injectable()
export class AppService{

  constructor(private http: HttpClient) { }


  getGoldPrice() {
    return this.http.get(LinkApi.link + 'getgoldprice').pipe(map(data => data), catchError(this.handleError));
  }


  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

}
