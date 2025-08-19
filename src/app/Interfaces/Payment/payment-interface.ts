export interface PaymentInterface {
  id: Number;
  coins: Number;
  amountCents: Number;
  clientSecret?: string | null;
  paymentIntentId?: string | null;
}
