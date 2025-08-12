export interface MdetailsInterface {
  performedAt: string; // ISO datetime e.g. "2025-08-10T16:06:00"
  nextMaintenanceDue: string; // ISO datetime
  carKMsAtTime: number;
  maintenanceCenter: string;
  comment: string | null;
  cost: number;
}
