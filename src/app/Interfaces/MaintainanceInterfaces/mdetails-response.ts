import { MdetailsInterface } from './mdetails-interface';

export interface MdetailsResponse {
  success: boolean;
  message: string;
  data: MdetailsInterface[];
}
