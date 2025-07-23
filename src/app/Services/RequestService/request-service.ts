import { IPreRequest } from './../../Interfaces/ipre-request';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFilteredTechResponse } from '../../Interfaces/ifiltered-tech-response';
import { IEmergencyRequest } from '../../Interfaces/iemergency-request';
@Injectable({
  providedIn: 'root',
})
export class RequestService {
  clientService = inject(HttpClient);
  public realRequest: IEmergencyRequest;

  constructor() {
    this.realRequest = {
      carOwnerId: 0,
      categoryId: 0,
      latitude: 0,
      longitude: 0,
      description: '',
      imageUrl: [],
      technicianIDs: [],
    };
  }
  public SetRealRequestData(
    preRequest: IPreRequest,
    desc: string,
    imgs: string[]
  ) {
    console.log('preRequest:', preRequest);
    console.log('desc:', desc);
    console.log('imgs:', imgs);
    this.realRequest.carOwnerId = preRequest.carOwnerId;
    this.realRequest.categoryId = preRequest.categoryId;
    this.realRequest.latitude = preRequest.latitude!;
    this.realRequest.longitude = preRequest.longitude!;
    this.realRequest.description = desc;
    this.realRequest.imageUrl = imgs;
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

  public CreateRequest(techs: number[]): Observable<any> {
    this.realRequest.technicianIDs = techs;
    {
      return this.clientService.post<any>(
        `http://localhost:5038/api/Request`,
        this.realRequest,
        { observe: 'response' }
      );
    }
    // public CreateRequests();
  }
}
