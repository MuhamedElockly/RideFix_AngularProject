import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatComponent } from '../../chat-component/chat-component';

@Component({
  selector: 'app-car-owner-module',
  imports: [RouterOutlet, ChatComponent],
  templateUrl: './car-owner-module.html',
  styleUrl: './car-owner-module.css',
})
export class CarOwnerModule {}
