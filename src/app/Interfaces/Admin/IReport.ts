export interface IReport {
  id: string;
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
  
  // New API fields
  description?: string;
  createdAt?: Date | string;
  reportingUserId?: string;
  reportingUserRole?: string;
  reportingEntityId?: number;
  reportedUserId?: string;
  reportedUserRole?: string;
  reportedEntityId?: number;
  requestId?: number;
  reportId?: number; // Added this field
  technicianName?: string;
  carOwnerName?: string;
  messages?: IReportMessage[];
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

// Report State Enum
export enum ReportState {
  Waiting = 1,
  Rejected = 2,
  Approved = 3
}

// Update Report DTO
export interface IUpdateReportDTO {
  reportId: number;
  reportState: ReportState;
}
