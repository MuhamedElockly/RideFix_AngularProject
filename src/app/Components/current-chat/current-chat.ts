import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IChatDetails } from '../../Interfaces/Chat/ichat-details';
import { ChatService } from '../../Services/ChatService/chat-service';
import { AuthService } from '../../Services/AuthService/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-current-chat',
  imports: [CommonModule],
  templateUrl: './current-chat.html',
  styleUrl: './current-chat.css',
})
export class CurrentChat {
  @Input() ChatId: Number = 0;
  chatDetails: IChatDetails | null = null;
  userId: string = '';
  chatService = inject(ChatService);
  authService = inject(AuthService);

  @Output() back = new EventEmitter<void>();

  public goBack() {
    this.back.emit();
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    console.log(this.userId);
    this.chatService.GetChatDetails(this.ChatId).subscribe({
      next: (res) => {
        this.chatDetails = res.data;
        console.log(res.data);
      },
      error(err) {
        console.log('error occured');
      },
    });
  }
}
