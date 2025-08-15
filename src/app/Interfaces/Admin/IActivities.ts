export interface IActivity {
  activityType: string;
  description: string;
  timestamp: string;
  timeAgo: string;
  entityType: string;
  entityId: number;
}

export interface IActivitiesData {
  emergencyRequests: IActivity[];
  carMaintenanceRecords: IActivity[];
  userRegistrations: IActivity[];
  reviews: IActivity[];
  chatSessions: IActivity[];
  totalCount: number;
  reportGeneratedAt: string;
}

export interface IActivitiesResponse {
  success: boolean;
  message: string;
  data: IActivitiesData;
}
