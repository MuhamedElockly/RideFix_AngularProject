import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICarResponse } from '../../Interfaces/Car/car-response';
import { ApiConfigService } from '../api-config.service';
import { CreateCarInterface } from '../../Interfaces/Car/create-car-interface';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  clientService = inject(HttpClient);
  private apiConfig = inject(ApiConfigService);

  public GetMyCar(): Observable<ICarResponse> {
    return this.clientService.get<ICarResponse>(
      this.apiConfig.getApiUrl('Car')
    );
  }

  CreateMyCar(car: CreateCarInterface): Observable<any> {
    return this.clientService.post<any>('http://localhost:5038/api/Car', car);
  }

  DeleteCar(): Observable<any> {
    return this.clientService.delete<any>(`http://localhost:5038/api/Car`);
  }
}
