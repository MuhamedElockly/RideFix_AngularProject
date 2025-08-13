import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INotificationResponse } from '../../Interfaces/Notifications/inotification-response';

@Injectable({
  providedIn: 'root',
})
export class NotificationServices {
  clientService = inject(HttpClient);

  public LoadNotifications(): Observable<INotificationResponse> {
    return this.clientService.get<INotificationResponse>(
      'http://localhost:5038/api/ReverseRequest'
    );
  }

  public AcceptNotification(requestId: Number): Observable<any> {
    return this.clientService.post(
      `http://localhost:5038/api/ReverseRequest/accept/${requestId}`,
      {}
    );
  }

  public RejectNotification(requestId: Number): Observable<any> {
    return this.clientService.post(
      `http://localhost:5038/api/ReverseRequest/reject/${requestId}`,
      {}
    );
  }
}
