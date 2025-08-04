import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavBarComponent } from '../../nav-bar-component/nav-bar-component';
import { FooterComponent } from '../../footer-component/footer-component';
import { ChatComponent } from '../../chat-component/chat-component';

@Component({
  selector: 'app-car-owner-module',

  //imports: [RouterOutlet, NavBarComponent, FooterComponent],

  imports: [RouterOutlet, NavBarComponent, FooterComponent, ChatComponent],

  templateUrl: './car-owner-module.html',
  styleUrl: './car-owner-module.css',
})
export class CarOwnerModule {}
