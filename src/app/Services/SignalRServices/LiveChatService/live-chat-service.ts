import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IChatDetails } from '../../../Interfaces/Chat/ichat-details';
import * as signalR from '@microsoft/signalr';
import Swal from 'sweetalert2';
import { IChatSessionResponse } from '../../../Interfaces/CurrentChat/ichat-session-response';

@Injectable({
  providedIn: 'root',
})
export class LiveChatService {
  private hubConnection: signalR.HubConnection | undefined;
  private http = inject(HttpClient);
  constructor() {}

  public startConnection() {

    
    const token = localStorage.getItem('token'); // لو التوكن مخزن في localStorage

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5038/chathub', {
        accessTokenFactory: () => token || '', // تمرير التوكن عبر الـ Authorization header
      }) // المسار للـ Hub
      // .withAutomaticReconnect()
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

  public SendMessage(ChatSessionId: Number, message: string) {
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
        console.log()
        console.log('Message Sent');
      });
  }


  // public addReceiveMessageListener(callback: (message: any) => void) {
  //   this.hubConnection?.on('ReceiveMessage', callback);
  // }

  public addReceiveMessageListener() {
  
    this.hubConnection?.on('receivemessage', (message: string) => {
        console.log('Received notification: ' + message);
        Swal.fire({
          icon: 'success',
          title: 'تم التنفيذ',
          text: 'تم الموافقة علي الطلب',
        }).then(() => {
          // this.routerService.navigateByUrl(`CarOwner/Home`);
        });
      });
  }

  public getCurrentChat(): Observable<IChatSessionResponse> {
  return this.http.get<IChatSessionResponse>('http://localhost:5038/api/Chat/LoadCurrentChat');
}



}
