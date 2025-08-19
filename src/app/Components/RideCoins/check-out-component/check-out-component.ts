import {
  loadStripe,
  Stripe,
  StripeElements,
  StripeCardNumberElement,
  StripeCardExpiryElement,
  StripeCardCvcElement,
} from '@stripe/stripe-js';
import {
  AfterViewInit,
  Component,
  inject,
  Input,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaymentServices } from '../../../Services/PaymentService/payment-services';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out-component',
  standalone: true,
  imports: [],
  templateUrl: './check-out-component.html',
  styleUrls: ['./check-out-component.css'], // ✅ كانت styleUrl غلط
})
export class CheckOutComponent implements OnInit, AfterViewInit, OnDestroy {
  private stripe: Stripe | null = null;
  private elements!: StripeElements;
  private cardNumberEl!: StripeCardNumberElement;
  private cardExpiryEl!: StripeCardExpiryElement;
  private cardCvcEl!: StripeCardCvcElement;
  Id: Number = 0;
  paymentService = inject(PaymentServices);
  @Input() coins: Number = 0;
  clientSecret: string | undefined | null = '';
  loading = false;
  paymentVisible = false; // نتحكم في ظهور السيكشن

  private mounted = false;

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    // 1) حمل Stripe (وقّف beacons عشان الإضافات/AdBlock في الديف)
    this.stripe = await (loadStripe as any)(environment.stripePublishableKey);
    if (!this.stripe) {
      console.error('Stripe failed to load');
      return;
    }

    // 2) هات client_secret من الباك (عدّل الـ endpoint حسب مشروعك)
    this.paymentService.getClientSecret(this.coins).subscribe({
      next: (res) => {
        console.log(res.clientSecret);
        this.clientSecret = res.clientSecret;
        this.Id = res.id;
      },
      error: (err) => {
        console.error('Error fetching client_secret:', err);
      },
    });

    if (!this.clientSecret) {
      console.warn('No client_secret returned from API');
    }

    // خلي السيكشن يظهر قبل ما نركّب العناصر
    this.paymentVisible = true;
  }

  async ngAfterViewInit() {
    // استنى Stripe لو لسه محمّلش
    await this.waitForStripe();
    this.mountStripeElements();
  }

  ngOnDestroy() {
    try {
      this.cardNumberEl?.unmount();
      this.cardExpiryEl?.unmount();
      this.cardCvcEl?.unmount();
    } catch {}
  }

  private async waitForStripe() {
    if (this.stripe) return;
    for (let i = 0; i < 60; i++) {
      // بحد أقصى ~3 ثواني
      await new Promise((r) => setTimeout(r, 50));
      if (this.stripe) return;
    }
  }

  private mountStripeElements() {
    if (!this.stripe || this.mounted) return;

    // اتأكد إن الحاويات موجودة
    const numberHost = document.getElementById('card-number-element');
    const expiryHost = document.getElementById('card-expiry-element');
    const cvcHost = document.getElementById('card-cvc-element');
    if (!numberHost || !expiryHost || !cvcHost) return;

    this.elements = this.stripe.elements();

    const style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased' as const,
        fontSize: '16px',
        '::placeholder': { color: '#aab7c4' },
      },
      invalid: { color: '#fa755a', iconColor: '#fa755a' },
    };

    this.cardNumberEl = this.elements.create('cardNumber', { style });
    this.cardExpiryEl = this.elements.create('cardExpiry', { style });
    this.cardCvcEl = this.elements.create('cardCvc', { style });

    this.cardNumberEl.mount('#card-number-element');
    this.cardExpiryEl.mount('#card-expiry-element');
    this.cardCvcEl.mount('#card-cvc-element');

    const purchaseBtn = document.getElementById(
      'purchase-btn'
    ) as HTMLButtonElement | null;
    const toggleBtn = (complete: boolean) => {
      if (purchaseBtn)
        purchaseBtn.disabled = !complete || !this.clientSecret || this.loading;
    };
    let numberOk = false,
      expiryOk = false,
      cvcOk = false;

    this.cardNumberEl.on('change', (e) => {
      numberOk = !!e.complete;
      toggleBtn(numberOk && expiryOk && cvcOk);
    });
    this.cardExpiryEl.on('change', (e) => {
      expiryOk = !!e.complete;
      toggleBtn(numberOk && expiryOk && cvcOk);
    });
    this.cardCvcEl.on('change', (e) => {
      cvcOk = !!e.complete;
      toggleBtn(numberOk && expiryOk && cvcOk);
    });

    toggleBtn(false);
    this.mounted = true;
  }
  // يستدعيه الزرار في الـ HTML
  async processPurchase() {
    if (!this.stripe) {
      alert('Stripe not ready');
      return;
    }
    if (!this.clientSecret) {
      alert('Payment not initialized');
      return;
    }

    const nameInput = document.getElementById(
      'cardholder'
    ) as HTMLInputElement | null;
    const billingName = nameInput?.value?.trim() || undefined;

    this.loading = true;
    try {
      const { error, paymentIntent } = await this.stripe.confirmCardPayment(
        this.clientSecret,
        {
          payment_method: {
            card: this.cardNumberEl, // expiry + cvc مربوطين تلقائيًا
            billing_details: { name: billingName },
          },
        }
      );

      if (error) {
        alert(`Payment failed: ${error.message}`);
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        this.paymentService.createTransaction(this.Id).subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: 'تمت العملية بنجاح',
              text: 'تم إنشاء المعاملة بنجاح 🎉',
              confirmButtonText: 'تمام',
            }).then(() => {
              window.location.reload(); // يعمل Refresh للصفحة كلها
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'فشل العملية',
              text: 'حصل خطأ أثناء إنشاء المعاملة ⚠️',
              confirmButtonText: 'حسناً',
            });
          },
        });
      } else if (paymentIntent?.status === 'processing') {
        alert('Payment processing…');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'فشل العملية',
          text: 'حصل خطأ أثناء إنشاء المعاملة ⚠️',
          confirmButtonText: 'حسناً',
        });
      }
    } catch (e: any) {
      console.error('Payment error', e);
      Swal.fire({
        icon: 'error',
        title: 'فشل العملية',
        text: 'حصل خطأ أثناء إنشاء المعاملة ⚠️',
        confirmButtonText: 'حسناً',
      });
    } finally {
      this.loading = false;
    }
  }
}
