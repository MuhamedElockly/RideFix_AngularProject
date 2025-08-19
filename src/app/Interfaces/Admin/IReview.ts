export interface IReview {
  id?: number;
  rate: number;
  comment: string;
  carOwnerName: string;
  technicianName: string;
  dateTime: string;
  // Legacy fields for backward compatibility
  reviewerName?: string;
  reviewerImage?: string;
  rating?: number;
  date?: string;
  isVerified?: boolean;
}

export interface IReviewResponse {
  success: boolean;
  message: string;
  data: IReview[];
}


