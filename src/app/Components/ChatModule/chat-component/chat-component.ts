import {
  AfterViewChecked,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { IChatModel } from '../../../Interfaces/Chat/ichat-model';
import { ChatService } from '../../../Services/ChatService/chat-service';
import { ChatDetailsComponent } from '../chat-details-component/chat-details-component';
import { LiveChatService } from '../../../Services/SignalRServices/LiveChatService/live-chat-service';
import { CurrentChat } from '../current-chat/current-chat';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-chat-component',
  imports: [ChatDetailsComponent, CurrentChat],
  templateUrl: './chat-component.html',
  styleUrl: './chat-component.css',
  encapsulation: ViewEncapsulation.None, // ✨ الحل هنا
})
export class ChatComponent implements OnInit, OnDestroy {
  url = environment.imgurl;
  isRequestAvaliablle: boolean = true;
  isCurrentChat: boolean = true;
  ShowMessage: boolean = false;
  Chats: IChatModel[] = [];
  ChatDetailsOn: boolean = false;
  chatService = inject(ChatService);
  selectedChatId: Number = 0;
  liveChatService = inject(LiveChatService);
  toggleChat() {
    this.ShowMessage = !this.ShowMessage;
  }

  ngOnInit(): void {
    this.liveChatService.startConnection();
    this.liveChatService.printConnectionState();

    this.chatService.GetChatHistory().subscribe({
      next: (res) => {
        this.Chats = res.data;
      },
    });
  }
  ngOnDestroy(): void {
    this.liveChatService.stopConnection;
  }
  ShowDetails(id: Number) {
    this.selectedChatId = id;
    this.ChatDetailsOn = true;
  }
  backFromDetails() {
    this.ChatDetailsOn = false;
  }
}
