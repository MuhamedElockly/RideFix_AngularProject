import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICarResponse } from '../../Interfaces/Car/car-response';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  clientService = inject(HttpClient);

  public GetMyCar(): Observable<ICarResponse> {
    return this.clientService.get<ICarResponse>(
      `http://localhost:5038/api/Car`
    );
  }
}
