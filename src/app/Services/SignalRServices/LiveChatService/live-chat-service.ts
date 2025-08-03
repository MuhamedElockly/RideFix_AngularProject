import { inject, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class LiveChatService {
  private hubConnection: signalR.HubConnection | undefined;
  constructor() {}

  public startConnection() {
    const token = localStorage.getItem('token'); // لو التوكن مخزن في localStorage

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5038/chathub', {
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

  public printConnectionState() {
    setInterval(() => {
      console.log('LiveChat Connection State:', this.hubConnection?.state);
    }, 5000); // تطبع الحالة كل 5 ثواني
  }

  public sendmessage(ChatSessionId: Number, message: string) {
    if (this.hubConnection?.state === signalR.HubConnectionState.Disconnected) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'disconnected',
      });
      return;
    }

    this.hubConnection
      ?.invoke('sendmessage', ChatSessionId, message)
      .then(() => {
        console.log('Message Sent');
      });
  }
}
