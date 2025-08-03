import { IChatModel } from './ichat-model';

export interface IChatModelResponse {
  success: boolean;
  message: string;
  data: IChatModel[];
}
