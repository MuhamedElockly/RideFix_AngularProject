import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

Injectable({
  providedIn: 'root',
});
import { inject } from '@angular/core';
import { IChatModelResponse } from '../../Interfaces/Chat/ichat-model-response';

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
}
