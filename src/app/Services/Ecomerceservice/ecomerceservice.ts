import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { HttpClient } from '@microsoft/signalr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Ecomerceservice {

  constructor(  private http: HttpClient,){}
  // Get all products
  getAllProducts() {
    return this.http.get<any>('http://localhost:5038/api/Product').pipe(map(res => res.data));
  }

  // Get all categories
  getAllCategories() {
    return this.http.get<any>('http://localhost:5038/api/ProductCategory').pipe(map(res => res.data));
  }


}
