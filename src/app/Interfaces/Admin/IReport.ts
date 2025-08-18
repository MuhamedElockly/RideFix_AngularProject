export interface IReport {
  id?: string;
  description: string;
  createdAt: string;
  reportingUserId: string;
  reportingUserRole: string;
  reportingEntityId: number;
  reportedUserId: string;
  reportedUserRole: string;
  reportedEntityId: number;
  requestId: number;
  technicianName: string;
  carOwnerName: string;
  messages: IReportMessage[];
  // Legacy fields for backward compatibility
  reporterId?: string;
  reporterName?: string;
  reporterRole?: string;
  reportedUserName?: string;
  reportType?: string;
  reportReason?: string;
  reportDescription?: string;
  reportDate?: Date | string;
  status?: 'Pending' | 'Resolved' | 'Dismissed';
  adminNotes?: string;
  resolutionDate?: Date | string;
  resolvedBy?: string;
  chatMessages?: IChatMessage[];
}

export interface IReportMessage {
  messageId: number;
  text: string;
  sentAt: string;
  isSeen: boolean;
  senderId: string;
  senderName: string;
}

export interface IChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  message: string;
  timestamp: Date | string;
  isRead: boolean;
  messageType: 'text' | 'image' | 'file';
}

export interface IReportsResponse {
  success: boolean;
  message: string;
  data: {
    reports: IReport[];
  };
}
