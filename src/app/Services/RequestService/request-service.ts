import { IPreRequest } from './../../Interfaces/ipre-request';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TempPinCheck } from '../../Interfaces/temp-pin-check';
@Injectable({
  providedIn: 'root',
})
export class RequestService {
  clientService = inject(HttpClient);
  public GetPinCode(preRequest: IPreRequest): Observable<TempPinCheck[]> {
    return this.clientService.get<TempPinCheck[]>(
      `http://localhost:3000/preRequests?carOwnerId=${preRequest.carOwnerId}`
    );
  }
}
