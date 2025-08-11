import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-footer-component',
  imports: [],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.css',
  encapsulation: ViewEncapsulation.None, // ✨ الحل هنا
})
export class FooterComponent {}
