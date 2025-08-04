import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { TechnicianNavBar } from '../technician-nav-bar/technician-nav-bar';
import { FooterComponent } from '../../footer-component/footer-component';
import { ChatComponent } from '../../chat-component/chat-component';

@Component({
  selector: 'app-technician-module',
  imports: [
    RouterOutlet,
    Sidebar,
    TechnicianNavBar,
    FooterComponent,
    ChatComponent,
  ],
  templateUrl: './technician-module.html',
  styleUrl: './technician-module.css',
})
export class TechnicianModule {}
