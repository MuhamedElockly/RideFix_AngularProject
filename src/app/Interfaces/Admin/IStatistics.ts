export interface IUsersCount {
  techniciansCount: number;
  carOwnersCount: number;
}

export interface IRequestsCount {
  allRequestsCount: number;
  waitingRequestsCount: number;
}

// New interfaces for dashboard statistics
export interface IUserGrowth {
  thisMonth: number;
  lastMonth: number;
  difference: number;
}

export interface IUserStatistics {
  technicians: {
    count: number;
    percent: number;
  };
  carOwners: {
    count: number;
    percent: number;
  };
  growth: IUserGrowth;
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
