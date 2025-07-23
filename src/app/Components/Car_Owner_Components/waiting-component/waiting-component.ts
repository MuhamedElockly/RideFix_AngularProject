import { Component } from '@angular/core';
import { NavBarComponent } from '../../nav-bar-component/nav-bar-component';
import { FooterComponent } from '../../footer-component/footer-component';

@Component({
  selector: 'app-waiting-component',
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './waiting-component.html',
  styleUrl: './waiting-component.css',
})
export class WaitingComponent {}
