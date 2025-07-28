import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { IReviewRequest } from '../../Interfaces/ireview-request';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  clientService = inject(HttpClient);
  public AddReview(review: IReviewRequest): Observable<any> {
    return this.clientService.post<any>(
      `http://localhost:5038/api/Review`,
      review,
      { observe: 'response' }
    );
  }
}
