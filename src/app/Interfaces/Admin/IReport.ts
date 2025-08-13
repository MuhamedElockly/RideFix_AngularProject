export interface IReport {
  id: string;
  reporterId: string;
  reporterName: string;
  reporterRole: string;
  reportedUserId: string;
  reportedUserName: string;
  reportedUserRole: string;
  reportType: string;
  reportReason: string;
  reportDescription: string;
  reportDate: Date;
  status: 'Pending' | 'Resolved' | 'Dismissed';
  adminNotes?: string;
  resolutionDate?: Date;
  resolvedBy?: string;
  chatMessages?: IChatMessage[];
}

export interface IChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  messageType: 'text' | 'image' | 'file';
}
