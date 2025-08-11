import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavBarComponent } from '../../General/nav-bar-component/nav-bar-component';
import { FooterComponent } from '../../General/footer-component/footer-component';
import { ChatComponent } from '../../ChatModule/chat-component/chat-component';

@Component({
  selector: 'app-car-owner-module',

  //imports: [RouterOutlet, NavBarComponent, FooterComponent],

  imports: [RouterOutlet, NavBarComponent, FooterComponent, ChatComponent],

  templateUrl: './car-owner-module.html',
  styleUrl: './car-owner-module.css',
})
export class CarOwnerModule {}
