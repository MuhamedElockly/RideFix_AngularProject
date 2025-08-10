export interface MaintenanceSummaryItem {
  maintenanceTypeName: string;
  status: Number; // 1 for not Needed, 2 for Needed, 0 for No Inforamtion
  lastMaintenanceDate: string | null; // التنسيق الحالي: "dd/MM/yyyy HH:mm:ss"
  nextExpectedMaintenance: string | null;
}
