import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
export class CurrentChat implements AfterViewChecked, OnInit {
  @ViewChild('bottomOfMessages') bottomOfMessages!: ElementRef;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  chatDetails: IChatSession | null = null;
  userId: string = '';
  chatService = inject(ChatService);
  authService = inject(AuthService);
  liveChatService = inject(LiveChatService);
  Message: string = '';

  // scroll
  ngAfterViewChecked() {
    this.scrollToBottomIfNearBottom();
  }
  scrollToBottomIfNearBottom(): void {
    const container = this.scrollContainer?.nativeElement;
    if (!container) return;

    const threshold = 100; // لو أقل من 100px من تحت نعمل سكرول
    const position = container.scrollTop + container.clientHeight;
    const height = container.scrollHeight;

    if (height - position <= threshold) {
      this.bottomOfMessages.nativeElement.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }
  //

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    // this.liveChatService.addReceiveMessageListener();
    // console.log('✅ SignalR connection started (inside ngOnInit)');

    this.liveChatService.addReceiveMessageListener((message) => {
      console.log('📥 Message received:', message);
      if (message.applicationId !== this.userId && this.chatDetails?.messages) {
        console.log('📥 Message received:', message);
        this.chatDetails.messages.push(message);
        this.scrollToBottomIfNearBottom();
      }
    });

    this.liveChatService.getCurrentChat().subscribe({
      next: (chat) => {
        this.chatDetails = chat.data;
        console.log('✅ Chat loaded:', chat.data);
      },
      error: (err) => {
        console.error('❌ Error loading chat:', err);
      },
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
        chatSessionId: this.chatDetails.id,
      });

      this.Message = '';
    }
  }
}
