import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Ecomerceservice } from '../../../Services/Ecomerceservice/ecomerceservice';
import { IProduct } from '../../../Interfaces/iproduct';
import { IProductCategory } from '../../../Interfaces/iproduct-category';
import { IShoppingCart } from '../../../Interfaces/ishopping-cart';
import Swal from 'sweetalert2';
import { Ifilterproduct } from '../../../Interfaces/ifilterproduct';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-products-components',
  imports: [FormsModule],
  templateUrl: './all-products-components.html',
  styleUrl: './all-products-components.css',
  encapsulation: ViewEncapsulation.None,
})
export class AllProductsComponents implements OnInit{

  constructor(private ecomerces:Ecomerceservice,private route: ActivatedRoute,private router:Router) {}

  products: IProduct[] = [];
  categories: IProductCategory[] = [];
  shoppingCart: IShoppingCart[] = [];
  addedToCart!: IShoppingCart ;
  totalProducts : number = 0;
  filteredProducts: Ifilterproduct= {
    pageNumber: 1,
    maxPrice: null,
    categoryId: null
    };
  selectedCategoryId: number | null = null;
  pageNumber: number = 1;
  totalPages: number = 1;
oldproducts: IProduct[] = [];

  ngOnInit(): void {

     this.ecomerces.getAllProducts().subscribe({
      next: (products) => {
        this.products = Array.isArray(products) ? products : [products];
        this.oldproducts = this.products;
        // console.log(this.products);
        // this.AllProducts = this.products;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });

       this.ecomerces.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = Array.isArray(categories) ? categories : [categories];

         this.totalProducts = this.categories.reduce(
      (sum, category) => sum + category.productsCount,
      0
    );
    this.totalPages = Math.ceil(this.totalProducts / 9);
    console.log(this.totalPages);
    // this.total=this.totalProducts;
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


    this.route.queryParams.subscribe(params => {
    if (params['category']) {
      this.selectedCategoryId = +params['category']; // تحويل لرقم
      const count = params['qunatity'] ? +params['qunatity'] : 0;
      this.getProductBycategory(this.selectedCategoryId,count);
    }
  });

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


// filteredProducts: IProduct[] = [];
// selectedCategoryIds: number [] = [];

  getProductBycategory(categoryId:number,prouductcount:number){


    this.filteredProducts.categoryId = categoryId;
    if (this.filteredProducts.maxPrice === null ) {
      this.filteredProducts.maxPrice = ""}; // Default max price if not set

    this.ecomerces.getProductsByCategory(this.filteredProducts).subscribe({
      next: (products) => {
        this.products = Array.isArray(products) ? products : [products];
            this.totalPages = Math.ceil(prouductcount / 9);
        this.pageNumber = 1; // Reset page number when filtering by category
        this.oldproducts = this.products;

        console.log(this.products);
      },
      error: (err) => {
        this.products = [];
        console.error('Error fetching products by category:', err);
      }
  })
}

filterByPrice(price: number) {

  this.filteredProducts.maxPrice = price;
  if (this.filteredProducts.categoryId === null) {
    this.filteredProducts.categoryId = "";
  }
  this.ecomerces.getProductsByCategory(this.filteredProducts).subscribe({
    next: (products) => {

      this.products = Array.isArray(products) ? products : [products];
      this.oldproducts = this.products; // Store the original products for pagination
      console.log(this.products);
    },
    error: (err) => {
      this.products = [];
      console.error('Error fetching products by price:', err);
    }
  });
}

nextpage(){
  this.pageNumber++;
  this.filteredProducts.pageNumber = this.pageNumber;

  if (this.filteredProducts.maxPrice === null ) {
    this.filteredProducts.maxPrice = ""};
  if (this.filteredProducts.categoryId === null) {
    this.filteredProducts.categoryId = "";
  }
  this.ecomerces.getProductsByCategory(this.filteredProducts).subscribe({
    next: (products) => {
      this.products = Array.isArray(products) ? products : [products];
      console.log(this.products);
    },
    error: (err) => {
      console.error('Error fetching next page of products:', err);
    }
  });
}

  previouspage(){
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.filteredProducts.pageNumber = this.pageNumber;

        if (this.filteredProducts.maxPrice === null ) {
    this.filteredProducts.maxPrice = ""};
  if (this.filteredProducts.categoryId === null) {
    this.filteredProducts.categoryId = "";
  }
      this.ecomerces.getProductsByCategory(this.filteredProducts).subscribe({
        next: (products) => {
          this.products = Array.isArray(products) ? products : [products];
          console.log(this.products);
        },
        error: (err) => {
          console.error('Error fetching previous page of products:', err);
        }
      });
    }
  }


  searchProductsByName(name: string) {
    if (name.trim() === '') {
      this.products = this.oldproducts;
      return;
    }

    this.ecomerces.getProductsByName(name).subscribe({
      next: (products) => {
        this.products = Array.isArray(products) ? products : [products];
        console.log(this.products);
      },
      error: (err) => {
        this.products = [];
        console.error('Error searching products by name:', err);
      }
    });
  }


   getArray(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }


   viewProductDetails(productId: number) {
    const path = this.router.url;
    const parts = path.split('/').filter(p => p);
    if( parts[parts.length - 2] === 'CarOwner')  {
      this.router.navigate(['/CarOwner/productdetails', productId]);
    }else if(parts[parts.length - 2] === 'technician'){
      this.router.navigate(['/technician/productdetails', productId]);
    }

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
}
