export interface IUsersCount {
  techniciansCount: number;
  carOwnersCount: number;
}

export interface IRequestsCount {
  allRequestsCount: number;
  waitingRequestsCount: number;
}

// New interfaces for dashboard statistics
export interface IUserStatistics {
  technicians: {
    count: number;
    percent: number;
  };
  carOwners: {
    count: number;
    percent: number;
  };
  newUsers: number;
  rates: number;
}

export interface IRequestStatistics {
  completed: {
    count: number;
    percent: number;
  };
  waiting: {
    count: number;
    percent: number;
  };
  active: {
    count: number;
    percent: number;
  };
  canceled: {
    count: number;
    percent: number;
  };
}

export interface IDashboardStatistics {
  users: IUserStatistics;
  requests: IRequestStatistics;
}

export interface IDashboardStatisticsResponse {
  success: boolean;
  message: string;
  data: IDashboardStatistics;
}
