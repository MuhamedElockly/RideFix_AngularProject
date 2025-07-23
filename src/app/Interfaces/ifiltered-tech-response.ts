import { ITechnician } from './itechnician';

export interface IFilteredTechResponse {
  success: boolean;
  message: string;
  data: ITechnician[];
}
