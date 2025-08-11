import { IMaintenanceType } from './imaintenance-type';

export interface IMaintenanceResponse {
  success: boolean;
  message: string;
  data: IMaintenanceType[];
}
