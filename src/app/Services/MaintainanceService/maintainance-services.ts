import { GetLocation } from './../LocationService/get-location';
import { Observable } from 'rxjs';
import { ICarMaintenanceRecord } from './../../Interfaces/MaintainanceInterfaces/icar-maintenance-record';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMaintenanceType } from '../../Interfaces/Mtypes/imaintenance-type';
import { MaintenanceSummaryItem } from '../../Interfaces/MaintainanceInterfaces/maintenance-summary-item';
import { MSummaryResponse } from '../../Interfaces/MaintainanceInterfaces/m-summary-response';
import { MdetailsResponse } from '../../Interfaces/MaintainanceInterfaces/mdetails-response';

@Injectable({
  providedIn: 'root',
})
export class MaintainanceServices {
  clientService = inject(HttpClient);
  public AddNewMaintainance(
    newRecord: ICarMaintenanceRecord
  ): Observable<ICarMaintenanceRecord> {
    return this.clientService.post<ICarMaintenanceRecord>(
      `http://localhost:5038/api/CarMaintanance`,
      newRecord
    );
  }

  public GetMSummary(): Observable<MSummaryResponse> {
    return this.clientService.get<MSummaryResponse>(
      `http://localhost:5038/api/CarMaintanance`
    );
  }

  public GetHistoryByType(id: number): Observable<MdetailsResponse> {
    return this.clientService.get<MdetailsResponse>(
      `http://localhost:5038/api/CarMaintanance/history/${id}`
    );
  }
}
