import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { HttpClient } from '@microsoft/signalr';
import { map } from 'rxjs';
import { IShoppingCart } from '../../Interfaces/ishopping-cart';
import { IApiResponse } from '../../Interfaces/iapi-response';

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

  // Add product to cart
  addToCart(x:IShoppingCart) {
    return this.http.post<IApiResponse<boolean>>(
      `http://localhost:5038/api/ShoppingCart?productId=${x.productId}&quantity=${x.quantity}`,null);
      }

  // update product quantity
  updateQuantity(x:IShoppingCart) {
    return this.http.put<IApiResponse<boolean>>(
      `http://localhost:5038/api/ShoppingCart/${x.productId}?newQuantity=${x.quantity}`,null);
  }

  // Get shopping cart
  getShoppingCart() {
    return this.http.get<any>('http://localhost:5038/api/ShoppingCart').pipe(map(res => res.data));
  }

}
