import { ICategory } from './icategory';
import { IReview } from './ireview';

export interface ITechnician {
  TechId: Number;
  name: string;
  faceImageURL: string;
  startWorking: string;
  endWorking: string;
  description: string;
  tCategories: ICategory[];
  reviews: IReview;
}
