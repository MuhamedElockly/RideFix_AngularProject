import { IRequestDetails } from './irequest-details';

export interface IRequestDetailsResponse {
  success: boolean;
  message: string;
  data: IRequestDetails; // ✅ لأن الـ data عبارة عن object
}
