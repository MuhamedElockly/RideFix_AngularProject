import { environment } from './../../../../environments/environment';
import Swal from 'sweetalert2';
import { ChatService } from '../../../Services/ChatService/chat-service';
import { IChatDetails } from '../../../Interfaces/Chat/ichat-details';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from '../../../Services/AuthService/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-details-component',
  imports: [CommonModule],
  templateUrl: './chat-details-component.html',
  styleUrl: './chat-details-component.css',
  standalone: true,
})
export class ChatDetailsComponent implements OnInit {
  @Input() ChatId: Number = 0;
  chatDetails: IChatDetails | null = null;
  userId: string = '';
  chatService = inject(ChatService);
  authService = inject(AuthService);
  url = environment.imgurl;

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
