export interface ICarMaintenanceRecord {
  maintenanceTypeId: Number;
  performedAt: string; // Date in ISO string format e.g., "2025-08-08T00:00:00"
  carKMsAtTime: Number;
  maintenanceCenter: string;
  Cost: Number; // Cost of the maintenance in EGP
  comment?: string;
}
