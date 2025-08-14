import { Component, OnInit, viewChild, ViewEncapsulation } from '@angular/core';
import { Ecomerceservice } from '../../../Services/Ecomerceservice/ecomerceservice';
import { IProduct } from '../../../Interfaces/iproduct';
import { IProductCategory } from '../../../Interfaces/iproduct-category';

@Component({
  selector: 'app-e-commerce-home-component',
  imports: [],
  templateUrl: './e-commerce-home-component.html',
  styleUrl: './e-commerce-home-component.css',
  encapsulation: ViewEncapsulation.None, // الحل هنا
})
export class ECommerceHomeComponent implements OnInit{
  constructor(private ecomerces:Ecomerceservice) {}

  products: IProduct[] = [];
  categories: IProductCategory[] = [];

  ngOnInit(): void {
    this.ecomerces.getAllProducts().subscribe({
      next: (products) => {
        this.products = Array.isArray(products) ? products : [products];
        // console.log(this.products);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });


     this.ecomerces.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = Array.isArray(categories) ? categories : [categories];
        console.log(this.categories);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });

  }

}
