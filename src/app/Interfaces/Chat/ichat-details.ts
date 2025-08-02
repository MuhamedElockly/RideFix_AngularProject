import { IChatMessage } from './ichat-message';

export interface IChatDetails {
  name: string;
  imgurl: string;
  messages: IChatMessage[];
}
