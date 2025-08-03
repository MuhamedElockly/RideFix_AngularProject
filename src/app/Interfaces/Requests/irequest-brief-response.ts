import { IRequestBrief } from './irequest-brief';

export interface IRequestBriefResponse {
  success: boolean;
  message: string;
  data: IRequestBrief;
}
