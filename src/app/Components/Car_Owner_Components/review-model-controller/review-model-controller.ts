import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IReviewRequest } from '../../../Interfaces/Reviews/ireview-request';
import { ReviewService } from '../../../Services/ReviewService/review-service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-model-controller',
  standalone: true,
  templateUrl: './review-model-controller.html',
  styleUrl: './review-model-controller.css',
  imports: [FormsModule, CommonModule],
  encapsulation: ViewEncapsulation.None, // ✨ الحل هنا
})
export class ReviewModelController {
  @Input() isVisible = true;
  @Input() technicianName = '';
  @Input() categoryName = '';
  reviewService = inject(ReviewService);
  rating = 0;
  comment = '';
  hoveredRating = 0;
  routeServie = inject(Router);
  stars = [1, 2, 3, 4, 5];

  setRating(rating: number) {
    this.rating = rating;
  }

  setHoveredRating(rating: number) {
    this.hoveredRating = rating;
  }

  clearHoveredRating() {
    this.hoveredRating = 0;
  }

  isStarFilled(star: number): boolean {
    return star <= (this.hoveredRating || this.rating);
  }

  onSubmit() {
    if (this.rating === 0) {
      alert('يرجى تقييم الخدمة أولاً');
      return;
    }
    let reqId = Number(localStorage.getItem('CurrentRequestId'));
    const completionData: IReviewRequest = {
      rate: this.rating,
      comment: this.comment,
      requestId: reqId,
      carOwnerId: 1,
    };
    this.reviewService.AddReview(completionData).subscribe({
      next: (res) => {
        localStorage.removeItem('CurrentRequestId');
        this.routeServie.navigateByUrl('/CarOwner/Home');
        window.location.reload();
      },
      error: (res) => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'لقد حدث خطأ',
        });
      },
    });
    this.resetForm();
  }

  private resetForm() {
    this.rating = 0;
    this.comment = '';
    this.hoveredRating = 0;
  }

  closeModal() {
    this.isVisible = false;
    this.resetForm();
  }
}
