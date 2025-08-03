import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IChatDetails } from '../../Interfaces/Chat/ichat-details';
import { ChatService } from '../../Services/ChatService/chat-service';
import { AuthService } from '../../Services/AuthService/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { LiveChatService } from '../../Services/SignalRServices/LiveChatService/live-chat-service';
import { IChatSessionResponse } from '../../Interfaces/CurrentChat/ichat-session-response';
import { IChatSession } from '../../Interfaces/CurrentChat/ichat-session';

@Component({
  selector: 'app-current-chat',
  standalone: true, //✨ ضروري
  imports: [CommonModule, FormsModule],
  templateUrl: './current-chat.html',
  styleUrl: './current-chat.css',
})
export class CurrentChat implements AfterViewChecked  {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  chatDetails: IChatSession | null = null;
  userId: string = '';
  chatService = inject(ChatService);
  authService = inject(AuthService);
  liveChatService = inject(LiveChatService);
  Message: string = '';

//scroll
   ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
   private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }
//////



  ngOnInit(): void {
    console.log('Khoooooooooly');
    this.userId = this.authService.getUserId();
    console.log(this.userId);

    this.liveChatService.getCurrentChat().subscribe({
      next: (chat) => {
        this.chatDetails = chat.data;
        console.log('✅ Chat loaded:', chat.data);
      },
      error: (err) => {
        console.error('❌ Error loading chat:', err);
      },
    });

    this.liveChatService.startConnection();
    this.liveChatService.addReceiveMessageListener((message) => {
      this.chatDetails?.messages?.push(message); // ✅ بس لو مش رسالتي أنا
    });
  }

  SendMessage() {
    console.log('test');

    if (this.Message.trim() !== '' && this.chatDetails) {
      console.log(this.chatDetails);
      console.log(this.Message);
      this.liveChatService.SendMessage(6, this.Message); //this.chatDetails.id
      if (!Array.isArray(this.chatDetails.messages)) {
        this.chatDetails.messages = [];
      }
      this.chatDetails.messages.push({
        text: this.Message,
        sentAt: new Date().toISOString(),
        applicationId: this.userId,
        isSeen: false,
        chatSessionId : this.chatDetails.id       
      });
      
      this.Message = '';
    }
  }
}
