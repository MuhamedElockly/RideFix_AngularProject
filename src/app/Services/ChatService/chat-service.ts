import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { IChatModelResponse } from '../../Interfaces/Chat/ichat-model-response';
import { IChatDetailsResponse } from '../../Interfaces/Chat/ichat-details-response';
import { ApiConfigService } from '../api-config.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private clientService = inject(HttpClient);
  private apiConfig = inject(ApiConfigService);

  public GetChatHistory(): Observable<IChatModelResponse> {
    return this.clientService.get<IChatModelResponse>(
      `${this.apiConfig.getApiUrl('Chat')}/GetAllChats`
    );
  }

  public GetChatDetails(
    ChatSessionId: Number
  ): Observable<IChatDetailsResponse> {
    return this.clientService.get<IChatDetailsResponse>(
      `${this.apiConfig.getApiUrl('Chat')}/GetChatById?chatsessionid=${ChatSessionId}`
    );
  }
}
