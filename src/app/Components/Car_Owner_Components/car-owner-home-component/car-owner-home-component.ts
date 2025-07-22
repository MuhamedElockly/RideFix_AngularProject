import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-car-owner-home-component',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './car-owner-home-component.html',
  styleUrl: './car-owner-home-component.css',
  encapsulation: ViewEncapsulation.None, // ✨ الحل هنا
})
export class CarOwnerHomeComponent {}
