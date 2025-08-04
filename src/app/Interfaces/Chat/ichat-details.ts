import { IChatMessage } from './ichat-message';

export interface IChatDetails {
  id: number;
  name: string;
  imgurl: string;
  messages: IChatMessage[];
}
