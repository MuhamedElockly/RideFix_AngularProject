import { IShoppingCart } from "./ishopping-cart";

export interface Iorderhistory {
id: number;
location: string;
orderState: number;
totalPrice: number;
orderItems: IShoppingCart[];

}
