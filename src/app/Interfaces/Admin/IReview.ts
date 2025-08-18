export interface IReview {
  id: number;
  reviewerName: string;
  reviewerImage?: string;
  rating: number;
  comment: string;
  date: string;
  isVerified: boolean;
}

export interface IReviewResponse {
  success: boolean;
  message: string;
  data: IReview[];
}
