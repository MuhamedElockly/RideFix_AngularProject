import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private clientService: HttpClient) {}

  createReport(description: string, requestId: Number) {
    const payload = { description, requestId };
    return this.clientService.post<void>(`${this.baseUrl}/Report`, payload);
  }
}
