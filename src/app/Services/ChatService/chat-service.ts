import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

Injectable({
  providedIn: 'root',
});
import { inject } from '@angular/core';
import { IChatModelResponse } from '../../Interfaces/Chat/ichat-model-response';
import { IChatDetailsResponse } from '../../Interfaces/Chat/ichat-details-response';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private clientService = inject(HttpClient); // ← هنا صح
  public GetChatHistory(): Observable<IChatModelResponse> {
    return this.clientService.get<IChatModelResponse>(
      `http://localhost:5038/api/Chat/GetAllChats`
    );
  }

  public GetChatDetails(
    ChatSessionId: Number
  ): Observable<IChatDetailsResponse> {
    return this.clientService.get<IChatDetailsResponse>(
      `http://localhost:5038/api/Chat/GetChatById?chatsessionid=${ChatSessionId}`
    );
  }
}
