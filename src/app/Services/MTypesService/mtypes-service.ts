import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMaintenanceResponse } from '../../Interfaces/Mtypes/imaintenance-response';
import { HttpClient } from '@angular/common/http'; // ✅ الصح هنا

@Injectable({
  providedIn: 'root',
})
export class MtypesService {
  clientService = inject(HttpClient);

  public GetAll(): Observable<IMaintenanceResponse> {
    return this.clientService.get<IMaintenanceResponse>(
      `http://localhost:5038/api/MaintainanceTypes`
    );
  }
}
