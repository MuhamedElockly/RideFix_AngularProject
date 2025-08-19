import { AuthService } from './../../../Services/AuthService/auth.service';
import { PaymentServices } from './../../../Services/PaymentService/payment-services';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wallet-component',
  imports: [RouterLink],
  templateUrl: './wallet-component.html',
  styleUrl: './wallet-component.css',
})
export class WalletComponent implements OnInit {
  myCoins: Number = 0;
  PaymentServices = inject(PaymentServices);
  AuthService = inject(AuthService);
  Role: string = '';
  ngOnInit(): void {
    this.PaymentServices.getCurrentBalance().subscribe({
      next: (res) => {
        this.myCoins = res.data;
      },
    });
    this.Role = this.AuthService.getRole();
  }
}
