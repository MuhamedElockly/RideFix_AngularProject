import { ICategory } from './icategory';
import { IReview } from '../Reviews/ireview';
import { IReviewDetails } from '../Reviews/ireview-details';

export interface ITechnichianDetails {
  id: number;
  name: string;
  startWorking: string; // "00:00:00"
  endWorking: string; // "23:59:59"
  description: string;
  faceImageUrl: string;
  categories: ICategory[];
  reviews: IReviewDetails[];
  government: number;
}
