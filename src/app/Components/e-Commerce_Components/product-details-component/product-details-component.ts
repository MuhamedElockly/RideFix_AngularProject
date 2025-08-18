import { Component, OnInit } from '@angular/core';
import { Ecomerceservice } from '../../../Services/Ecomerceservice/ecomerceservice';
import { IproductDetails } from '../../../Interfaces/iproduct-details';
import { ActivatedRoute, Router } from '@angular/router';
import { IShoppingCart } from '../../../Interfaces/ishopping-cart';
import { IProduct } from '../../../Interfaces/iproduct';
import Swal from 'sweetalert2';
import { CommonModule, DatePipe } from '@angular/common';
import { Ifilterproduct } from '../../../Interfaces/ifilterproduct';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../Services/AuthService/auth.service';
import { IReview } from '../../../Interfaces/ireview';
import { IproductRates } from '../../../Interfaces/iproduct-rates';

@Component({
  selector: 'app-product-details-component',
  imports: [DatePipe,CommonModule, FormsModule],
  templateUrl: './product-details-component.html',
  styleUrl: './product-details-component.css'
})
export class ProductDetailsComponent implements OnInit{

  constructor(private ecomerces:Ecomerceservice ,private route:ActivatedRoute,private router :Router,private authoz:AuthService){}

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
  comment: string = '';




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

  buyNow(item: IproductDetails){
if(!this.hasAlreadyAddtocart(item.productId)){
  this.addToCart(item);

}



const path = this.router.url;
    const parts = path.split('/').filter(p => p);
    if( parts[parts.length - 3] === 'CarOwner')  {
      this.router.navigate(['/CarOwner/cartpage']);
    }else if(parts[parts.length - 3] === 'technician'){
      this.router.navigate(['/technician/cartpage']);
    }
  }

 gotomainpage(){
    const path = this.router.url;
    const parts = path.split('/').filter(p => p);
    if( parts[parts.length - 3] === 'CarOwner')  {
      this.router.navigate(['/CarOwner/Home']);
    }else if(parts[parts.length - 3] === 'technician'){
      this.router.navigate(['/technician/requests']);
    }
  }

   gotomarketpage(){
    const path = this.router.url;
    const parts = path.split('/').filter(p => p);
    if( parts[parts.length - 3] === 'CarOwner')  {
      this.router.navigate(['/CarOwner/Market']);
    }else if(parts[parts.length - 3] === 'technician'){
      this.router.navigate(['/technician/Market']);
    }
  }

  gotoallproductpage(){
    const path = this.router.url;
    const parts = path.split('/').filter(p => p);
    if( parts[parts.length - 3] === 'CarOwner')  {
      this.router.navigate(['/CarOwner/AllProducts']);
    }else if(parts[parts.length - 3] === 'technician'){
      this.router.navigate(['/technician/AllProducts']);
    }
  }


  currentRate = 0;

setRate(star: number) {
  this.currentRate = star;
  console.log("Selected rate:", this.currentRate);
}

sendReview() {
  // console.log("Comment:", this.comment);
  // console.log("Rating:", this.currentRate);
  // console.log("Product ID:", this.productDetails.productId);
  // console.log("User ID:", this.authoz.getUserId());
  // console.log("User Name:", this.authoz.getUserName());
  // console.log("createdAt:", new Date());
console.log("productid",this.productDetails.productId);

  if (this.currentRate === 0 || this.comment.trim() === '') {
    Swal.fire({
      icon: 'warning',
      title: 'تنبيه',
      text: 'يرجى إدخال تقييم وتعليق قبل الإرسال.',
      confirmButtonText: 'حسناً'
    });
    return;
  }
  const review: IproductRates= {
    value: this.currentRate,
    comment: this.comment,
    userId: this.authoz.getUserId(),
    userName: this.authoz.getUserName(),
    createdAt: new Date().toISOString()
  };

  this.ecomerces.postReview(this.productDetails.productId, review).subscribe({
    next: (response) => {
      if (response.success) {
        Swal.fire({
          icon: 'success',
          title: 'تمت الإضافة بنجاح',
          text: 'تم إضافة تقييمك بنجاح.',
          confirmButtonText: 'حسناً'
        });
        this.productDetails.productRates.push(review);
        window.location.reload();
        // this.productDetails.productRates.push(review);
        // this.comment = '';
        // this.currentRate = 0;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'حدث خطأ أثناء إضافة التقييم.',
          confirmButtonText: 'حسناً'
        });
      }
    },
    error: (err) => {
      console.error('Error posting review:', err);
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'حدث خطأ أثناء إضافة التقييم.',
        confirmButtonText: 'حسناً'
      });
    }
  });

  this.comment = '';
  this.currentRate = 0;
}

}
