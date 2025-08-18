import { Component, OnInit } from '@angular/core';
import { Ecomerceservice } from '../../../Services/Ecomerceservice/ecomerceservice';
import { IproductDetails } from '../../../Interfaces/iproduct-details';
import { ActivatedRoute, Router } from '@angular/router';
import { IShoppingCart } from '../../../Interfaces/ishopping-cart';
import { IProduct } from '../../../Interfaces/iproduct';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Ifilterproduct } from '../../../Interfaces/ifilterproduct';

@Component({
  selector: 'app-product-details-component',
  imports: [DatePipe],
  templateUrl: './product-details-component.html',
  styleUrl: './product-details-component.css'
})
export class ProductDetailsComponent implements OnInit{

  constructor(private ecomerces:Ecomerceservice ,private route:ActivatedRoute,private router :Router){}

  productDetails!:IproductDetails;
  activeTab: string = 'description';
  shoppingCart: IShoppingCart[] = [];
  products: IProduct[] = [];
  filteredProducts: Ifilterproduct= {
      pageNumber: 1,
      maxPrice: null,
      categoryId: null
      };

  quantity: number = 1;
  totalprice: number = 0;
  fiveStarRating: number = 0;
  fiveStarCount: number = 0;
  foureStarRating: number = 0;
  fourStarCount: number = 0;
  threeStarRating: number = 0;
  threeStarCount: number = 0;
  twoStarRating: number = 0;
  twoStarCount: number = 0;
  oneStarRating: number = 0;
  oneStarCount: number = 0;




  ngOnInit(): void {
    // const productId = Number(localStorage.getItem('productId'));
    const productId= Number(this.route.snapshot.paramMap.get('id'));

    if (productId) {
      this.ecomerces.getProductDetails(productId).subscribe({
        next: (details) => {
          this.productDetails = details;
          for (const rate of this.productDetails.productRates) {
            if (rate.value === 5) {
              this.fiveStarCount++;
            } else if (rate.value === 4) {
              this.fourStarCount++;
            } else if (rate.value === 3) {
              this.threeStarCount++;
            } else if (rate.value === 2) {
              this.twoStarCount++;
            } else if (rate.value === 1) {
              this.oneStarCount++;
            }
          }
          this.fiveStarRating = (this.fiveStarCount / this.productDetails.productRates.length) * 100;
          this.foureStarRating = (this.fourStarCount / this.productDetails.productRates.length) * 100;
          this.threeStarRating = (this.threeStarCount / this.productDetails.productRates.length) * 100;
          this.twoStarRating = (this.twoStarCount / this.productDetails.productRates.length) * 100;
          this.oneStarRating = (this.oneStarCount / this.productDetails.productRates.length)*100;

            this.filteredProducts.categoryId = this.productDetails.categoryId;
    if (this.filteredProducts.maxPrice === null ) {
      this.filteredProducts.maxPrice = ""}; // Default max price if not set

    this.ecomerces.getProductsByCategory(this.filteredProducts).subscribe({
      next: (products) => {
        this.products = Array.isArray(products) ? products : [products];


        console.log(this.products);
      },
      error: (err) => {
        this.products = [];
        console.error('Error fetching products by category:', err);
      }
  })
          console.log(this.productDetails);
        },
        error: (err) => {
          console.error('Error fetching product details:', err);
        }
      });
    } else {
      console.error('No product ID found in local storage');
    }



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

  getArray(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }

  // tab-pane
  //
  setActiveTab(tab: string) {
  this.activeTab = tab;
}

  hasAlreadyAddtocart(productId=Number(this.route.snapshot.paramMap.get('id'))): boolean {

        // const productId= Number(this.route.snapshot.paramMap.get('id'));


    return (
      Array.isArray(this.shoppingCart) &&
      this.shoppingCart.some((app) => app.productId === productId)
    );
  }


    addToCart(item: IproductDetails) {

      Swal.fire({
        icon: 'success',
        title: 'تمت الإضافة للسلة',
        text: `تم إضافة ${item.name} إلى سلة التسوق بنجاح.`,
        confirmButtonText: 'تمام'
      }).then((request)=>{
        const cartItem: IShoppingCart = {
          productId: item.productId,
          quantity: this.quantity,
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


     increaseQuantity(item: IproductDetails): void {
    this.quantity++;
    this.totalprice+= item.price;
    // this.updateCart(item);
  }

  decreaseQuantity(item: IproductDetails): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.totalprice-= item.price;
      // this.updateCart(item);
    }
  }

  buyNow(){
const path = this.router.url;
    const parts = path.split('/').filter(p => p);
    if( parts[parts.length - 3] === 'CarOwner')  {
      this.router.navigate(['/CarOwner/cartpage']);
    }else if(parts[parts.length - 3] === 'technician'){
      this.router.navigate(['/technician/cartpage']);
    }
  }

    // getProductBycategory(categoryId:number){


    // this.filteredProducts.categoryId = categoryId;
    // if (this.filteredProducts.maxPrice === null ) {
      // this.filteredProducts.maxPrice = ""}; // Default max price if not set

  //   this.ecomerces.getProductsByCategory(this.filteredProducts).subscribe({
  //     next: (products) => {
  //       this.products = Array.isArray(products) ? products : [products];


  //       console.log(this.products);
  //     },
  //     error: (err) => {
  //       this.products = [];
  //       console.error('Error fetching products by category:', err);
  //     }
  // })
// }

}
