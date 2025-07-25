import { IPreRequest } from './../../Interfaces/ipre-request';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFilteredTechResponse } from '../../Interfaces/ifiltered-tech-response';
import { IEmergencyRequest } from '../../Interfaces/iemergency-request';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class RequestService {
  clientService = inject(HttpClient);
  public realRequest: IEmergencyRequest;
  routerService = inject(Router);

  constructor() {
    this.realRequest = {
      carOwnerId: 0,
      categoryId: 0,
      latitude: 0,
      longitude: 0,
      description: '',
      imageUrl: [],
      technicianIDs: [],
      pin: 0,
    };
  }
  public SetRealRequestData(
    preRequest: IPreRequest,
    desc: string,
    imgs: string[]
  ) {
    this.realRequest.carOwnerId = preRequest.carOwnerId;
    this.realRequest.categoryId = preRequest.categoryId;
    this.realRequest.latitude = preRequest.latitude!;
    this.realRequest.longitude = preRequest.longitude!;
    this.realRequest.description = desc;
    this.realRequest.imageUrl = imgs;
    localStorage.setItem('realRequest', JSON.stringify(this.realRequest));
  }

  public SetRealRequestFromLocal() {
    if (this.realRequest.categoryId != 0) {
      const storedRequest = localStorage.getItem('realRequest');
      if (storedRequest) {
        this.realRequest = JSON.parse(storedRequest);
      } else {
        this.routerService.navigateByUrl('CarOwner/RequestEmergency');
      }
    }
  }

  public CreatePreRequest(
    preRequest: IPreRequest
  ): Observable<HttpResponse<IFilteredTechResponse>> {
    return this.clientService.post<IFilteredTechResponse>(
      `http://localhost:5038/api/Technician`,
      preRequest,
      { observe: 'response' }
    );
  }

  public CreateRequest(techs: number[], pinvalue: Number): Observable<any> {
    this.realRequest.technicianIDs = techs;
    this.realRequest.pin = pinvalue;
    return this.clientService.post<any>(
      `http://localhost:5038/api/Request`,
      this.realRequest,
      { observe: 'response' }
    );
    // public CreateRequests();
  }

  public CancelRequest(ownerId: number): Observable<any> {
    return this.clientService.delete<any>(
      `http://localhost:5038/api/Request/${ownerId}`
    );
  }
}
