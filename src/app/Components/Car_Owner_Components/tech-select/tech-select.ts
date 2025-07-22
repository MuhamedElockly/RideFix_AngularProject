import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tech-select',
  imports: [],
  templateUrl: './tech-select.html',
  styleUrl: './tech-select.css',
  encapsulation: ViewEncapsulation.None, // ✨ الحل هنا
})
export class TechSelect {}
