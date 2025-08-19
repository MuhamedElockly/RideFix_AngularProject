import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PaymentInterface } from '../../Interfaces/Payment/payment-interface';
import { WalletResponseInterface } from '../../Interfaces/Payment/wallet-response-interface';

@Injectable({
  providedIn: 'root',
})
export class PaymentServices {
  clientService = inject(HttpClient);

  getClientSecret(coins: Number): Observable<PaymentInterface> {
    return this.clientService.get<PaymentInterface>(
      `${environment.apiBaseUrl}/Payment/PaymentInt/${coins}`
    );
  }

  createTransaction(id: Number): Observable<any> {
    return this.clientService.post<any>(
      `${environment.apiBaseUrl}/Payment/CreateTransaction/${id}`,
      {} // لو الـ endpoint محتاج body فاضي
    );
  }

  getCurrentBalance(): Observable<WalletResponseInterface> {
    return this.clientService.get<WalletResponseInterface>(
      `${environment.apiBaseUrl}/Payment/GetPersonalCoins`
    );
  }
}
