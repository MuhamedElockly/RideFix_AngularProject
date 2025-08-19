import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INotificationResponse } from '../../Interfaces/Notifications/inotification-response';
import { ApiConfigService } from '../api-config.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationServices {
  clientService = inject(HttpClient);
  private apiConfig = inject(ApiConfigService);

  public LoadNotifications(): Observable<INotificationResponse> {
    return this.clientService.get<INotificationResponse>(
      this.apiConfig.getApiUrl('ReverseRequest')
    );
  }

  public AcceptNotification(requestId: Number): Observable<any> {
    return this.clientService.post(
      `${this.apiConfig.getApiUrl('ReverseRequest')}/accept/${requestId}`,
      {}
    );
  }

  public RejectNotification(requestId: Number): Observable<any> {
    return this.clientService.post(
      `${this.apiConfig.getApiUrl('ReverseRequest')}/reject/${requestId}`,
      {}
    );
  }
}
