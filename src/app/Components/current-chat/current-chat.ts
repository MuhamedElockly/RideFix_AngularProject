import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IChatDetails } from '../../Interfaces/Chat/ichat-details';
import { ChatService } from '../../Services/ChatService/chat-service';
import { AuthService } from '../../Services/AuthService/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LiveChatService } from '../../Services/SignalRServices/LiveChatService/live-chat-service';

@Component({
  selector: 'app-current-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './current-chat.html',
  styleUrl: './current-chat.css',
})
export class CurrentChat {
  chatDetails: IChatDetails | null = null;
  userId: string = '';
  chatService = inject(ChatService);
  authService = inject(AuthService);
  liveChatService = inject(LiveChatService);
  Message: string = '';

  ngOnInit(): void {
    console.log('Khoooooooooly');
    this.userId = this.authService.getUserId();
    console.log(this.userId);
  }

  SendMessage() {
    this.liveChatService.sendmessage(6, this.Message);
  }
}
