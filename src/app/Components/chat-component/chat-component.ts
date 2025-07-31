import {
  AfterViewChecked,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { IChatModel } from '../../Interfaces/Chat/ichat-model';
import { ChatService } from '../../Services/ChatService/chat-service';
@Component({
  selector: 'app-chat-component',
  imports: [],
  templateUrl: './chat-component.html',
  styleUrl: './chat-component.css',
  encapsulation: ViewEncapsulation.None, // ✨ الحل هنا
})
export class ChatComponent implements OnInit {
  isRequestAvaliablle: boolean = false;
  isCurrentChat: boolean = true;
  ShowMessage: boolean = false;
  Chats: IChatModel[] = [];
  chatService = inject(ChatService);
  toggleChat() {
    this.ShowMessage = !this.ShowMessage;
  }

  ngOnInit(): void {
    this.chatService.GetChatHistory().subscribe({
      next: (res) => {
        this.Chats = res.data;
      },
    });
  }
}
