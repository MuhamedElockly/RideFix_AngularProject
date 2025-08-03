import { IChatSession } from "./ichat-session";

export interface IChatSessionResponse {
  success: boolean;
  message: string;
  data: IChatSession;
}