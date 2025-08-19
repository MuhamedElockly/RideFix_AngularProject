import { Component, OnInit } from '@angular/core';
import { Ecomerceservice } from '../../../Services/Ecomerceservice/ecomerceservice';
import { IShoppingCart } from '../../../Interfaces/ishopping-cart';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Icreateorder } from '../../../Interfaces/icreateorder';

@Component({
  selector: 'app-order-page-component',
  imports: [ FormsModule,],
  templateUrl: './order-page-component.html',
  styleUrl: './order-page-component.css'
})
export class OrderPageComponent implements OnInit {
  constructor(private ecomerces:Ecomerceservice ) { }

  totalprice: number = 0;
  shoppingCart: IShoppingCart[] = [];

  street: string = '';
  district: string = '';
  city: string = '';
  postalcode:string="";
  buildingdetails: string = '';
  // postal-code: string = '';


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

  createOrder(): void {
    if (!this.street || !this.district || !this.city || !this.postalcode || !this.buildingdetails) {
     Swal.fire({
           icon: 'warning',
           title: 'تنبيه',
           text: 'من فضلك أدخل جميع البيانات المطلوبة قبل إتمام الطلب',
           confirmButtonText: 'حسناً'
         });
         return;
    }

    const orderDetails:Icreateorder = {
      location:`${this.street}, ${this.district}, ${this.city}, ${this.postalcode}, ${this.buildingdetails}`


    }
    console.log(orderDetails.location);


this.ecomerces.createOrder(orderDetails).subscribe({
  next: (response) => {
    if (response.success) {
      Swal.fire({
        icon: 'success',
        title: 'تم إنشاء الطلب',
        text: 'تم إنشاء الطلب بنجاح!',
        confirmButtonText: 'حسناً'
      }).then(() => {
        // this.deleteAllFromCart(); // فضي السلة بعد تأكيد الرسالة
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'فشل العملية',
        text: 'لم يتم إنشاء الطلب. حاول مرة أخرى.',
        confirmButtonText: 'حسناً'
      });
    }
  },
  error: (err) => {
    console.error('Error creating order:', err);
    Swal.fire({
      icon: 'error',
      title: 'خطأ في الخادم',
      text: 'حدث خطأ أثناء إنشاء الطلب. حاول لاحقاً.',
      confirmButtonText: 'حسناً'
    });
  }
});



  }

}
