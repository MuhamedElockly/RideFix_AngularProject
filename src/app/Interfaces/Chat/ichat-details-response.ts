import { IChatDetails } from './ichat-details';

export interface IChatDetailsResponse {
  success: boolean;
  message: string;
  data: IChatDetails;
}
