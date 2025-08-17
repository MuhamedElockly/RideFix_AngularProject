import { Component, OnInit, viewChild, ViewEncapsulation } from '@angular/core';
import { Ecomerceservice } from '../../../Services/Ecomerceservice/ecomerceservice';
import { IProduct } from '../../../Interfaces/iproduct';
import { IProductCategory } from '../../../Interfaces/iproduct-category';
import Swal from 'sweetalert2';
import { IShoppingCart } from '../../../Interfaces/ishopping-cart';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-e-commerce-home-component',
  imports: [],
  templateUrl: './e-commerce-home-component.html',
  styleUrl: './e-commerce-home-component.css',
  encapsulation: ViewEncapsulation.None, // الحل هنا
})
export class ECommerceHomeComponent implements OnInit{
  constructor(private ecomerces:Ecomerceservice,public router: Router,private route: ActivatedRoute) {}

  products: IProduct[] = [];
  categories: IProductCategory[] = [];
  shoppingCart: IShoppingCart[] = [];
  addedToCart!: IShoppingCart ;


  ngOnInit(): void {
    this.ecomerces.getAllProducts().subscribe({
      next: (products) => {
        this.products = Array.isArray(products) ? products : [products];
        // console.log(this.products);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });


     this.ecomerces.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = Array.isArray(categories) ? categories : [categories];
        // console.log(this.categories);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });

    this.ecomerces.getShoppingCart().subscribe({
      next: (cart) => {
        this.shoppingCart = Array.isArray(cart) ? cart : [cart];
        console.log(this.shoppingCart);
      },
      error: (err) => {
        console.error('Error fetching shopping cart:', err);
      }
    });



  }

selectCategory(categoryId: number, productsCount: number) {
  const path = this.router.url;

   const parts = path.split('/').filter(p => p);
 if( parts[parts.length - 2] === 'CarOwner')  {
  this.router.navigate(['/CarOwner/AllProducts'], { queryParams: { category: categoryId ,qunatity:productsCount} });

 }else if(parts[parts.length - 2] === 'technician'){
  this.router.navigate(['/technician/AllProducts'], { queryParams: { category: categoryId ,qunatity:productsCount} });

 }
}

   addToCart(item: IProduct) {
    // TODO: منطق إضافة المنتج للسلة هنا

    // تنبيه نجاح بسيط
    Swal.fire({
      icon: 'success',
      title: 'تمت الإضافة للسلة',
      text: `تم إضافة ${item.name} إلى سلة التسوق بنجاح.`,
      confirmButtonText: 'تمام'
    }).then((request)=>{
      const cartItem: IShoppingCart = {
        productId: item.productId,
        quantity: 1,
        productName: item.name,
        price: item.price,
        imageUrl: item.imageUrl
      };

      this.ecomerces.addToCart(cartItem).subscribe({
        next: (response) => {
          // console.log('Response from addToCart:', response);
          if (response.success){
            // item.stockQuantity -= 1;
            console.log('Product added to cart successfully');
            window.location.reload();


            // this.ecomerces.updateQuantity(cartItem).subscribe({
            //   next: (updateResponse) => {
            //     if (updateResponse.success) {
            //       console.log('Product quantity updated successfully');
            //     } else {
            //       console.error('Failed to update product quantity');
            //     }
            //   }
            // });


          } else {
            console.error('Failed to add product to cart');
          }
        },
        error: (err) => {
          console.error('Error adding product to cart:', err);
        }
      });

    });
  }

  hasAlreadyAddtocart(productId: number): boolean {
    return (
      Array.isArray(this.shoppingCart) &&
      this.shoppingCart.some((app) => app.productId === productId)
    );
  }


  showAllProducts(){
    const path = this.router.url;
    const parts = path.split('/').filter(p => p);
    if( parts[parts.length - 2] === 'CarOwner')  {
      this.router.navigate(['/CarOwner/AllProducts']);
    }else if(parts[parts.length - 2] === 'technician'){
      this.router.navigate(['/technician/AllProducts']);
    }
  }

 getArray(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }
}
