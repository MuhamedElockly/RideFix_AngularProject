import { Component, OnInit } from '@angular/core';
import { Ecomerceservice } from '../../../Services/Ecomerceservice/ecomerceservice';
import { IShoppingCart } from '../../../Interfaces/ishopping-cart';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Icreateorder } from '../../../Interfaces/icreateorder';
import { concatMap, tap } from 'rxjs';
import { from } from 'rxjs';
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


  //  if (this.userRole === 'CarOwner') {
  //   basePath = '/CarOwner/AllProducts';
  // } else if (this.userRole === 'Technical') {
  //   basePath = '/Technical/AllProducts';
  // }

    // Navigate to the products page
    console.log("shopping cart", this.shoppingCart);

    // for (let item of this.shoppingCart) {
    //   const cartItem: IShoppingCart = {
    //     productId: item.productId,
    //     quantity: item.quantity,
    //     productName: item.productName,
    //     price: item.price,
    //     imageUrl: item.imageUrl,
    //     description: item.description,
    //     totalPrice:item.quantity*item.price,
    //   };

    //   this.ecomerces.updateQuantity(cartItem).subscribe({
    //     next: (response) => {
    //       console.log(`Updated quantity for product ${item.productName}`);
    //     },
    //     error: (err) => {
    //       console.error('Error updating quantity:', err);
    //     }
    //   });

    // }

  //    from(this.shoppingCart).pipe(
  //   concatMap(item => {
  //     const cartItem: IShoppingCart = {
  //       productId: item.productId,
  //       quantity: item.quantity,
  //       productName: item.productName,
  //       price: item.price,
  //       imageUrl: item.imageUrl,
  //       description: item.description,
  //       totalPrice: item.quantity * item.price,
  //     };
  //     console.log("carItem", cartItem);
  //     return this.ecomerces.updateQuantity(cartItem).pipe(
  //       tap(() => console.log(`Updated quantity for product ${item.productName}`))
  //     );
  //   })
  // ).subscribe({
  //   complete: () => {
  //     console.log("All items updated ");
  //     // this.navigateToOrderPage();
  //   },
  //   error: (err) => {
  //     console.error("Error updating:", err);
  //   }
  // });

 from(this.shoppingCart).pipe(
    concatMap(item => {
      const cartItem: IShoppingCart = {
        productId: item.productId,
        quantity: item.quantity,
        productName: item.productName,
        price: item.price,
        imageUrl: item.imageUrl,
        description: item.description,
        totalPrice: item.quantity * item.price,
      };
      console.log("carItem", cartItem);

      return this.ecomerces.updateQuantity(cartItem).pipe(
        tap(() => console.log(`Updated quantity for product ${item.productName}`))
      );
    })
  ).subscribe({
    complete: () => {
      console.log("All items updated successfully");

      // هنا بقى ننقل بعد ما التحديثات كلها تخلص
      const path = this.router.url;
      const parts = path.split('/').filter(p => p);
      if( parts[parts.length - 2] === 'CarOwner')  {

   window.location.href = '/CarOwner/AllProducts';
 }else if(parts[parts.length - 2] === 'technician'){

    window.location.href = '/technician/AllProducts';
 }
    },
    error: (err) => {
      console.error("Error updating:", err);
    }
  });

//     const path = this.router.url;
//  const parts = path.split('/').filter(p => p);
//  if( parts[parts.length - 2] === 'CarOwner')  {

//    window.location.href = '/CarOwner/AllProducts';
//  }else if(parts[parts.length - 2] === 'technician'){

//     window.location.href = '/technician/AllProducts';
//  }

  }

   gotomainpage(){
    const path = this.router.url;
    const parts = path.split('/').filter(p => p);
    if( parts[parts.length - 2] === 'CarOwner')  {
      this.router.navigate(['/CarOwner/Home']);
    }else if(parts[parts.length - 2] === 'technician'){
      this.router.navigate(['/technician/requests']);
    }
  }


    gotoallproductpage(){
    const path = this.router.url;
    const parts = path.split('/').filter(p => p);
    if( parts[parts.length - 2] === 'CarOwner')  {
      this.router.navigate(['/CarOwner/AllProducts']);
    }else if(parts[parts.length - 2] === 'technician'){
      this.router.navigate(['/technician/AllProducts']);
    }
  }

  createOrder() {


    console.log("shopping cart", this.shoppingCart);

    // for (let item of this.shoppingCart) {
    //   const cartItem: IShoppingCart = {
    //     productId: item.productId,
    //     quantity: item.quantity,
    //     productName: item.productName,
    //     price: item.price,
    //     imageUrl: item.imageUrl,
    //     description: item.description,
    //     totalPrice:item.quantity*item.price,

    //   };
    //   console.log("carItem",cartItem)

    //   this.ecomerces.updateQuantity(cartItem).subscribe({
    //     next: (response) => {
    //       console.log(`Updated quantity for product ${item.productName}`);
    //     },
    //     error: (err) => {
    //       console.error('Error updating quantity:', err);
    //     }
    //   });

    // }

  //    from(this.shoppingCart).pipe(
  //   concatMap(item => {
  //     const cartItem: IShoppingCart = {
  //       productId: item.productId,
  //       quantity: item.quantity,
  //       productName: item.productName,
  //       price: item.price,
  //       imageUrl: item.imageUrl,
  //       description: item.description,
  //       totalPrice: item.quantity * item.price,
  //     };
  //     console.log("carItem", cartItem);
  //     return this.ecomerces.updateQuantity(cartItem).pipe(
  //       tap(() => console.log(`Updated quantity for product ${item.productName}`))
  //     );
  //   })
  // ).subscribe({
  //   complete: () => {
  //     console.log("All items updated ✅");
  //     // this.navigateToOrderPage();
  //   },
  //   error: (err) => {
  //     console.error("Error updating:", err);
  //   }
  // });


  from(this.shoppingCart).pipe(
    concatMap(item => {
      const cartItem: IShoppingCart = {
        productId: item.productId,
        quantity: item.quantity,
        productName: item.productName,
        price: item.price,
        imageUrl: item.imageUrl,
        description: item.description,
        totalPrice: item.quantity * item.price,
      };
      console.log("carItem", cartItem);

      return this.ecomerces.updateQuantity(cartItem).pipe(
        tap(() => console.log(`Updated quantity for product ${item.productName}`))
      );
    })
  ).subscribe({
    complete: () => {
      console.log("All items updated successfully");

      // هنا بقى ننقل بعد ما التحديثات كلها تخلص
      const path = this.router.url;
      const parts = path.split('/').filter(p => p);
      if (parts[parts.length - 2] === 'CarOwner') {
        this.router.navigate(['/CarOwner/orderpage']);
      } else if (parts[parts.length - 2] === 'technician') {
        this.router.navigate(['/technician/orderpage']);
      }
    },
    error: (err) => {
      console.error("Error updating:", err);
    }
  });

    //    const path = this.router.url;
    // const parts = path.split('/').filter(p => p);
    // if( parts[parts.length - 2] === 'CarOwner')  {
    //   this.router.navigate(['/CarOwner/orderpage']);
    // }else if(parts[parts.length - 2] === 'technician'){
    //   this.router.navigate(['/technician/orderpage']);
    // }

  //   const x: Icreateorder = {
  //     location: prompt('Please enter your location:')??"",
  //   };

  //   if (x.location) {
  //     this.ecomerces.createOrder(x).subscribe({
  //       next: (response) => {
  //         if (response.success) {
  //           alert('Order created successfully!');
  //           this.deleteAllFromCart();
  //         } else {
  //           alert('Failed to create order.');
  //         }
  //       },
  //       error: (err) => {
  //         console.error('Error creating order:', err);
  //       }
  //     });
  //   } else {
  //     alert('Location is required to create an order.');
  //   }
  }

}


