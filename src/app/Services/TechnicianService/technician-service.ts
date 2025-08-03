import { ITechnichianDetails } from '../../Interfaces/Technichan/ItechnichianDetails';
import { IPreRequest } from '../../Interfaces/Requests/ipre-request';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITechnician } from '../../Interfaces/Technichan/itechnician';
import { IProfileResponse } from '../../Interfaces/iprofile-Response';
@Injectable({
  providedIn: 'root',
})
export class TechnicianService {
  clientService = inject(HttpClient);
  FilteredTechs: ITechnician[];
  profileViewId: number = 0;
  /**
   *
   */
  constructor() {
    this.FilteredTechs = [];
  }

  public setFilteredTechs(data: any) {
    this.FilteredTechs = data;
  }

  public getFilteredTechs(): ITechnician[] {
    return this.FilteredTechs;
  }

  public getTechDetails(
    Id: number
  ): Observable<HttpResponse<IProfileResponse>> {
    return this.clientService.get<IProfileResponse>(
      `http://localhost:5038/api/Technician/${this.profileViewId}`,
      { observe: 'response' }
    );
  }
}
