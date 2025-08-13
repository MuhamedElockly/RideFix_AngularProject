import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { TechnicianNavBar } from '../technician-nav-bar/technician-nav-bar';
import { FooterComponent } from '../../General/footer-component/footer-component';
import { ChatComponent } from '../../ChatModule/chat-component/chat-component';
import { NotificationsServices } from '../../../Services/SignalRServices/NotificationService/notifications-services';

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
export class TechnicianModule implements OnInit, OnDestroy {
  notificationService = inject(NotificationsServices);
  ngOnInit(): void {
    this.notificationService.startConnection();
    this.notificationService.printConnectionState();
  }
  ngOnDestroy(): void {
    this.notificationService.stopConnection();
  }
}
