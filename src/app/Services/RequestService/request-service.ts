import { IPreRequest } from './../../Interfaces/ipre-request';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TempPinCheck } from '../../Interfaces/temp-pin-check';
import { IFilteredTechResponse } from '../../Interfaces/ifiltered-tech-response';
@Injectable({
  providedIn: 'root',
})
export class RequestService {
  clientService = inject(HttpClient);
  public CreatePreRequest(
    preRequest: IPreRequest
  ): Observable<HttpResponse<IFilteredTechResponse>> {
    return this.clientService.post<IFilteredTechResponse>(
      `http://localhost:5038/api/Technician`,
      preRequest,
      { observe: 'response' }
    );
  }
}
