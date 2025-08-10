import { LoginComponent } from '../../Components/General/login/login';
import { IRequestBrief } from '../../Interfaces/Requests/irequest-brief';
import { IPreRequest } from '../../Interfaces/Requests/ipre-request';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFilteredTechResponse } from '../../Interfaces/Technichan/ifiltered-tech-response';
import { IEmergencyRequest } from '../../Interfaces/Requests/iemergency-request';
import { Router } from '@angular/router';
import { IRequestBriefResponse } from '../../Interfaces/Requests/irequest-brief-response';
import { RequestHistoryResponse } from '../../Interfaces/Requests/request-history-response';
import { IRequestDetailsResponse } from '../../Interfaces/Requests/irequest-details-response';
@Injectable({
  providedIn: 'root',
})
export class RequestService {
  clientService = inject(HttpClient);
  public realRequest: IEmergencyRequest;
  public alertBriefRequest: IRequestBrief | null = null;

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

  public SetRealRequestFromLocal(): IPreRequest | undefined {
    const storedRequest = localStorage.getItem('realRequest');

    if (storedRequest) {
      this.realRequest = JSON.parse(storedRequest);

      let temp: IPreRequest = {
        carOwnerId: this.realRequest.carOwnerId,
        categoryId: this.realRequest.categoryId,
        latitude: this.realRequest.latitude,
        longitude: this.realRequest.longitude,
      };

      return temp;
    } else {
      this.routerService.navigateByUrl('CarOwner/RequestEmergency');
      return undefined;
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
      `http://localhost:5038/api/Request/CancelAll/${ownerId}`
    );
  }

  public getRequestBrief(ownerId: number): Observable<IRequestBriefResponse> {
    return this.clientService.get<IRequestBriefResponse>(
      `http://localhost:5038/api/CarOwner?Id=${ownerId}`
    );
  }

  public setAlertRequest(request: IRequestBrief) {
    this.alertBriefRequest = {
      categoryName: request.categoryName,
      id: request.id,
      description: request.description,
      technicianName: request.technicianName,
    };
  }

  public CompleteRequest(): Observable<any> {
    let id = localStorage.getItem('CurrentRequestId');
    return this.clientService.post<any>(
      `http://localhost:5038/api/Request/CompleteRequest/${id}`,
      null
    );
  }

  public getRequestsHistory(Id: Number): Observable<RequestHistoryResponse> {
    return this.clientService.get<RequestHistoryResponse>(
      `http://localhost:5038/api/Request/RequestBreifDTOs/${Id}`
    );
  }

  public getRequestHistoryDetails(
    Id: Number
  ): Observable<IRequestDetailsResponse> {
    return this.clientService.get<IRequestDetailsResponse>(
      `http://localhost:5038/api/Request/RequestDetails/${Id}`
    );
  }
}
