import { Component, inject, OnInit } from '@angular/core';
import { CheckOutComponent } from '../check-out-component/check-out-component';
import { PaymentServices } from '../../../Services/PaymentService/payment-services';

@Component({
  selector: 'app-purshase-coins',
  imports: [CheckOutComponent],
  templateUrl: './purshase-coins.html',
  styleUrl: './purshase-coins.css',
})
export class PurshaseCoins implements OnInit {
  myCoins: Number = 0;
  PaymentServices = inject(PaymentServices);
  ngOnInit(): void {
    this.PaymentServices.getCurrentBalance().subscribe({
      next: (res) => {
        this.myCoins = res.data;
      },
    });
  }
  flag: boolean = false;
  Coins: Number = 0;
  togglePaymentSection(coins: Number) {
    this.flag = false;
    this.flag = true;
    this.Coins = coins;
  }
}
