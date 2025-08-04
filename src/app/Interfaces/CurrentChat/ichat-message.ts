export interface IChatMessage {
  text: string;
  sentAt: string;           // ISO Date string
  isSeen: boolean;
  chatSessionId: number;
  applicationId: string;    // sender's ID
}