import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';

import { INotificationInterface } from '../../../Interfaces/Notifications/inotification-interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationsServices {
  private hubConnection: signalR.HubConnection | undefined;
  routerService = inject(Router);
  constructor() {}

  public startConnection() {
    const token = localStorage.getItem('token'); // لو التوكن مخزن في localStorage

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5038/notificationhub', {
        accessTokenFactory: () => token || '', // تمرير التوكن عبر الـ Authorization header
      }) // المسار للـ Hub
      .build();

    // بدء الاتصال
    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR Connected');
        // عند بدء الاتصال نعمل subscribe على إشعارات الـ CarOwner
      })
      .catch((err: any) =>
        console.log('Error while starting connection: ' + err)
      );
  }

  public stopConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }

  public sendNotification(requestId: number) {
    if (this.hubConnection?.state === signalR.HubConnectionState.Disconnected) {
      console.error('Hub connection is disconnected');
      return;
    }
    this.hubConnection?.invoke('offerrequest', requestId).catch((err: any) => {
      console.error('Error sending notification: ' + err);
    });
  }
  public printConnectionState() {
    setInterval(() => {
      console.log('Notification Connection State:', this.hubConnection?.state);
    }, 10000); // تطبع الحالة كل 5 ثواني
  }

  public addReceiveListener(callback: (message: any) => void) {
    this.hubConnection?.on('recievenotification', callback);
  }
}
