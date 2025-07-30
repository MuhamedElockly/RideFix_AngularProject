import { IRequestBrief } from './irequest-brief';

export interface RequestHistoryResponse {
  success: boolean;
  message: string;
  data: IRequestBrief[];
}
