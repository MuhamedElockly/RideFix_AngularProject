import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAdminUser } from '../../Interfaces/Admin/IAdminUser';
import { IApiResponse } from '../../Interfaces/iapi-response';
import { ICategory, ICreateCategory, IUpdateCategory } from '../../Interfaces/Admin/ICategory';
import { ICarOwner } from '../../Interfaces/Admin/ICarOwner';
import { ITechnician } from '../../Interfaces/Admin/ITechnician';
import { IActivitiesResponse } from '../../Interfaces/Admin/IActivities';
import { IDashboardStatisticsResponse } from '../../Interfaces/Admin/IStatistics';
import { ApiConfigService } from '../api-config.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiConfig = inject(ApiConfigService);
  private baseUrl = this.apiConfig.getApiUrl('Admin');
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<IApiResponse<IAdminUser[]>> {
    return this.http.get<IApiResponse<IAdminUser[]>>(`${this.baseUrl}/users`);
  }



  getUserById(userId: string): Observable<IApiResponse<IAdminUser>> {
    return this.http.get<IApiResponse<IAdminUser>>(`${this.baseUrl}/users/${userId}`);
  }

  updateUserStatus(userId: string, status: string): Observable<IApiResponse<any>> {
    return this.http.put<IApiResponse<any>>(`${this.baseUrl}/users/${userId}/status`, { status });
  }

  deleteUser(userId: string): Observable<IApiResponse<any>> {
    return this.http.delete<IApiResponse<any>>(`${this.baseUrl}/users/${userId}`);
  }

  getTechnicians(): Observable<IApiResponse<ITechnician[]>> {
    return this.http.get<IApiResponse<ITechnician[]>>(`${this.baseUrl}/technicians`);
  }

  getCarOwners(): Observable<IApiResponse<ICarOwner[]>> {
    return this.http.get<IApiResponse<ICarOwner[]>>(`${this.baseUrl}/carOwners`);
  }

  blockCarOwner(carOwnerId: number): Observable<IApiResponse<any>> {
    return this.http.post<IApiResponse<any>>(`${this.baseUrl}/carOwner/${carOwnerId}`, {});
  }

  activateCarOwner(carOwnerId: number): Observable<IApiResponse<any>> {
    return this.http.post<IApiResponse<any>>(`${this.baseUrl}/carOwner/${carOwnerId}/active`, {});
  }

  blockTechnician(technicianId: number): Observable<IApiResponse<any>> {
    return this.http.post<IApiResponse<any>>(`${this.baseUrl}/tecnician/${technicianId}`, {});
  }

  activateTechnician(technicianId: number): Observable<IApiResponse<any>> {
    return this.http.post<IApiResponse<any>>(`${this.baseUrl}/technician/${technicianId}/active`, {});
  }

  // Reports Management Methods
  getReports(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/reports`);
  }

  getReportById(reportId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/reports/${reportId}`);
  }

  updateReportStatus(reportId: string, status: string, adminNotes?: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/reports/${reportId}/status`, {
      status,
      adminNotes,
      resolvedBy: 'Admin',
      resolutionDate: new Date()
    });
  }

  blockUserAccount(userId: string, reason: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${userId}/block`, {
      reason,
      blockedBy: 'Admin',
      blockedAt: new Date()
    });
  }

  // Categories Management Methods
  getCategories(): Observable<IApiResponse<ICategory[]>> {
    return this.http.get<IApiResponse<ICategory[]>>(`${this.baseUrl}/categories`);
  }

  getCategoryById(categoryId: string): Observable<IApiResponse<ICategory>> {
    return this.http.get<IApiResponse<ICategory>>(`${this.baseUrl}/categories/${categoryId}`);
  }

  createCategory(category: ICreateCategory): Observable<IApiResponse<ICategory>> {
    return this.http.post<IApiResponse<ICategory>>(`${this.baseUrl}/categories`, category);
  }

  updateCategory(categoryId: string, category: IUpdateCategory): Observable<IApiResponse<ICategory>> {
    return this.http.put<IApiResponse<ICategory>>(`${this.baseUrl}/categories/${categoryId}`, category);
  }

  deleteCategory(categoryId: string): Observable<IApiResponse<any>> {
    return this.http.delete<IApiResponse<any>>(`${this.baseUrl}/categories/${categoryId}`);
  }

  // Statistics Methods
  getUsersCount(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users-count`);
  }

  getRequestsCount(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/requests-count`);
  }

  // Activities Methods
  getActivities(hoursBack: number = 12): Observable<IActivitiesResponse> {
    return this.http.get<IActivitiesResponse>(`${this.baseUrl}/activities?hoursBack=${hoursBack}`);
  }

  // Dashboard Statistics Method
  getDashboardStatistics(): Observable<IDashboardStatisticsResponse> {
    return this.http.get<IDashboardStatisticsResponse>(`${this.baseUrl}/dashboard-statistics`);
  }

}
