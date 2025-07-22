import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-nav-bar-component',
  imports: [CommonModule],
  templateUrl: './nav-bar-component.html',
  styleUrl: './nav-bar-component.css',
  encapsulation: ViewEncapsulation.None, // ✨ الحل هنا
})
export class NavBarComponent {}
