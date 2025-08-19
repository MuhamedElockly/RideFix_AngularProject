// src/app/Services/CategoryService/category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../api-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {}

  getAllCategories(): Observable<any> {
    return this.http.get<any>(
      this.apiConfig.getApiUrlWithSubEndpoint('category', '')
    );
  }
}
