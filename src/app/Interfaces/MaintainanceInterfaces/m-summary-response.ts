import { MaintenanceSummaryItem } from './maintenance-summary-item';

export interface MSummaryResponse {
  success: boolean;
  message: string;
  data: MaintenanceSummaryItem[];
}
