import { Component, OnInit } from '@angular/core';
import { Ecomerceservice } from '../../../Services/Ecomerceservice/ecomerceservice';
import { IShoppingCart } from '../../../Interfaces/ishopping-cart';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-page-component',
  imports: [RouterModule],
  templateUrl: './cart-page-component.html',
  styleUrl: './cart-page-component.css'
})
export class CartPageComponent implements OnInit {
  constructor(private ecomerces:Ecomerceservice,private router:Router) {}

    shoppingCart: IShoppingCart[] = [];
    totalprice: number = 0;


ngOnInit(): void {
    this.ecomerces.getShoppingCart().subscribe({
      next: (cart) => {
        this.shoppingCart = Array.isArray(cart) ? cart : [cart];
        this.totalprice = this.shoppingCart.reduce((total, item) => total + (item.price * item.quantity), 0);

        console.log(this.shoppingCart);
      },
      error: (err) => {
        console.error('Error fetching shopping cart:', err);
      }
    });
  }

  increaseQuantity(item: IShoppingCart): void {
    item.quantity++;
    this.totalprice+= item.price;
    // this.updateCart(item);
  }

  decreaseQuantity(item: IShoppingCart): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.totalprice-= item.price;
      // this.updateCart(item);
    }
  }


  deleteFromCart(productId: number): void {
    this.ecomerces.deleteFromCart(productId).subscribe({
      next: (response) => {
        this.shoppingCart = this.shoppingCart.filter(item => item.productId !== productId);
        this.totalprice = this.shoppingCart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      error: (err) => {
        console.error('Error deleting item from cart:', err);
      }
    });
  }

  deleteAllFromCart(): void {
    this.ecomerces.deleteAllFromCart().subscribe({
      next: (response) => {
        this.shoppingCart = [ ];
        this.totalprice = 0;
      },
      error: (err) => {
        console.error('Error deleting all items from cart:', err);
      }
    });
  }

  continueShopping(): void {

const path = this.router.url;
 const parts = path.split('/').filter(p => p);
 if( parts[parts.length - 2] === 'CarOwner')  {

   window.location.href = '/CarOwner/AllProducts';
 }else if(parts[parts.length - 2] === 'technician'){

    window.location.href = '/technician/AllProducts';
 }

  //  if (this.userRole === 'CarOwner') {
  //   basePath = '/CarOwner/AllProducts';
  // } else if (this.userRole === 'Technical') {
  //   basePath = '/Technical/AllProducts';
  // }

    // Navigate to the products page
    console.log("shopping cart", this.shoppingCart);
    for (let item of this.shoppingCart) {
      const cartItem: IShoppingCart = {
        productId: item.productId,
        quantity: item.quantity,
        productName: item.productName,
        price: item.price,
      };

      this.ecomerces.updateQuantity(cartItem).subscribe({
        next: (response) => {
          console.log(`Updated quantity for product ${item.productName}`);
        },
        error: (err) => {
          console.error('Error updating quantity:', err);
        }
      });

    }
  }

}


