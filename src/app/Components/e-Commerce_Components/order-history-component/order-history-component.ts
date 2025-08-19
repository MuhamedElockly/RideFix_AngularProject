import { Component, OnInit } from '@angular/core';
import { Ecomerceservice } from '../../../Services/Ecomerceservice/ecomerceservice';
import { Iorderhistory } from '../../../Interfaces/iorderhistory';

@Component({
  selector: 'app-order-history-component',
  imports: [],
  templateUrl: './order-history-component.html',
  styleUrl: './order-history-component.css'
})
export class OrderHistoryComponent implements OnInit {
  constructor(private ecomerces:Ecomerceservice ) { }
orderhistory:Iorderhistory[]=[];
  totalprice: number = 0;
  orderactive:number = 0;
  ordercompleted:number = 0;

  ngOnInit(): void {
    this.ecomerces.getOrderHistory().subscribe({
      next: (history) => {
        this.orderhistory = Array.isArray(history) ? history : [history];
        this.totalprice = this.orderhistory.reduce((total, item) => total + (item.totalPrice ), 0);
         this.orderactive = this.orderhistory.filter(item => item.orderState === 1).length;
         this.ordercompleted = this.orderhistory.filter(item => item.orderState === 4).length;


        console.log(this.orderhistory);
      },
      error: (err) => {
        console.error('Error fetching order history:', err);
      }
    });
  }


}
