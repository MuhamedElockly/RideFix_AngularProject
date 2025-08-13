import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { INotificationInterface } from '../../../Interfaces/Notifications/inotification-interface';
import { NotificationServices } from '../../../Services/NotificationService/notification-services';

@Component({
  selector: 'app-notification-panel-component',
  imports: [],
  templateUrl: './notification-panel-component.html',
  styleUrl: './notification-panel-component.css',
  encapsulation: ViewEncapsulation.None,
})
export class NotificationPanelComponent implements OnInit {
  notifications: INotificationInterface[] = [];
  notificationService = inject(NotificationServices);
  ngOnInit(): void {
    this.notificationService.LoadNotifications().subscribe({
      next: (res) => {
        if (res.success) {
          this.notifications = res.data;
        } else {
          console.error('Failed to load notifications:', res.message);
        }
      },
      error: (err) => {
        console.error('Error loading notifications:', err);
      },
    });
  }
  acceptNotification(reqId: Number) {
    this.notificationService.AcceptNotification(reqId).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('Notification accepted successfully');
          this.notifications = [];
        } else {
          console.error('Failed to accept notification:', res.message);
        }
      },
      error: (err) => {
        console.error('Error accepting notification:', err);
      },
    });
  }
  rejectNotification(reqId: Number) {
    this.notificationService.RejectNotification(reqId).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('Notification rejected successfully');
          this.notifications = this.notifications.filter(
            (n) => n.requestId !== reqId
          );
        } else {
          console.error('Failed to reject notification:', res.message);
        }
      },
      error: (err) => {
        console.error('Error rejecting notification:', err);
      },
    });
  }
}
