import { ICategory } from './icategory';
import { IReview } from './ireview';

export interface FilteredTechniciansDTO {
  startWorking: string; // TimeOnly → string (مثلاً "08:00")
  endWorking: string;
  description: string;
  tCategories: ICategory[];
  reviews: IReview[];
}
