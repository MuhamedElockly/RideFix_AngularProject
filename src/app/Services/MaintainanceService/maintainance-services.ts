import { GetLocation } from './../LocationService/get-location';
import { Observable } from 'rxjs';
import { ICarMaintenanceRecord } from './../../Interfaces/MaintainanceInterfaces/icar-maintenance-record';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMaintenanceType } from '../../Interfaces/Mtypes/imaintenance-type';
import { MaintenanceSummaryItem } from '../../Interfaces/MaintainanceInterfaces/maintenance-summary-item';
import { MSummaryResponse } from '../../Interfaces/MaintainanceInterfaces/m-summary-response';
import { MdetailsResponse } from '../../Interfaces/MaintainanceInterfaces/mdetails-response';
import { ApiConfigService } from '../api-config.service';

@Injectable({
  providedIn: 'root',
})
export class MaintainanceServices {
  clientService = inject(HttpClient);
  private apiConfig = inject(ApiConfigService);

  public AddNewMaintainance(
    newRecord: ICarMaintenanceRecord
  ): Observable<ICarMaintenanceRecord> {
    return this.clientService.post<ICarMaintenanceRecord>(
      this.apiConfig.getApiUrl('CarMaintanance'),
      newRecord
    );
  }

  public GetMSummary(): Observable<MSummaryResponse> {
    return this.clientService.get<MSummaryResponse>(
      this.apiConfig.getApiUrl('CarMaintanance')
    );
  }

  public GetHistoryByType(id: number): Observable<MdetailsResponse> {
    return this.clientService.get<MdetailsResponse>(
      `${this.apiConfig.getApiUrl('CarMaintanance')}/history/${id}`
    );
  }
}
