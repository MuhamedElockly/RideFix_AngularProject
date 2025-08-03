import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class RequestWatchDogHub {
  private hubConnection: signalR.HubConnection | undefined;
  routerService = inject(Router);
  constructor() {}

  public startConnection() {
    const token = localStorage.getItem('token'); // لو التوكن مخزن في localStorage

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5038/requestWatchDogHub', {
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
      .catch((err) => console.log('Error while starting connection: ' + err));
  }

  public stopConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
  public addreceivemessagelistener() {
    this.hubConnection?.on('addreceivemessagelistener', (message: string) => {
      console.log('Received notification: ' + message);
      Swal.fire({
        icon: 'success',
        title: 'تم التنفيذ',
        text: 'تم الموافقة علي الطلب',
      }).then(() => {
        this.routerService.navigateByUrl(`CarOwner/Home`);
      });
    });
  }

  public acceptrequest(CarOwnerId: Number) {
    if (this.hubConnection?.state === signalR.HubConnectionState.Disconnected) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'disconnected',
      });
      return;
    }
    this.hubConnection?.invoke('acceptrequest', CarOwnerId).then(() => {
      console.log('Request accepted and notification sent to CarOwner');
    });
  }
  public printConnectionState() {
    setInterval(() => {
      console.log(
        'RequestWatchDog Connection State:',
        this.hubConnection?.state
      );
    }, 10000); // تطبع الحالة كل 5 ثواني
  }
}
