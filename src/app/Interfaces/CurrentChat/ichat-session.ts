import { IChatMessage } from "./ichat-message";

export interface IChatSession {
  id: number;
  startAt: string;         // ISO Date string
  endAt: string | null;
  isClosed: boolean;
  carOwnerId: number;
  technicianId: number;
  messages: IChatMessage[];
}