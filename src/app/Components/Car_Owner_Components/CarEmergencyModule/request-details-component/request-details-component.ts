import Swal from 'sweetalert2';
import { RequestService } from '../../../../Services/RequestService/request-service';
import type { IRequestDetails } from '../../../../Interfaces/Requests/irequest-details';
import {
  Component,
  inject,
  Input,
  type OnInit,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-details-component',
  imports: [CommonModule],
  templateUrl: './request-details-component.html',
  styleUrl: './request-details-component.css',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class RequestDetailsComponent implements OnInit {
  @Input() isVisible = false;
  @Input() Id: Number = 0;
  @Output() onClose = new EventEmitter<void>();

  requestDetails: IRequestDetails | null = null;
  requestService = inject(RequestService);
  isLoading = true;

  ngOnInit(): void {
    if (Number(this.Id) > 0) {
      this.loadRequestDetails();
    }
  }

  loadRequestDetails(): void {
    this.isLoading = true;
    this.requestService.getRequestHistoryDetails(this.Id).subscribe({
      next: (res) => {
        this.requestDetails = res.data;
        this.isLoading = false;
      },
      error: (res) => {
        this.isLoading = false;
      },
    });
  }

  closeModal(): void {
    this.onClose.emit();
  }

  printDetails(): void {
    window.print();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  generateStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? 'fas fa-star' : 'far fa-star');
    }
    return stars;
  }

  getRatingText(rating: number): string {
    switch (rating) {
      case 1:
        return 'ضعيف جداً';
      case 2:
        return 'ضعيف';
      case 3:
        return 'متوسط';
      case 4:
        return 'جيد';
      case 5:
        return 'ممتاز';
      default:
        return 'غير مقيم';
    }
  }
}
