import { Component, viewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-e-commerce-home-component',
  imports: [],
  templateUrl: './e-commerce-home-component.html',
  styleUrl: './e-commerce-home-component.css',
  encapsulation: ViewEncapsulation.None, // الحل هنا
})
export class ECommerceHomeComponent {}
