import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { IAdminUser } from '../../Interfaces/Admin/IAdminUser';
import { IApiResponse } from '../../Interfaces/iapi-response';
import { ICategory, ICreateCategory, IUpdateCategory } from '../../Interfaces/Admin/ICategory';
import { ICarOwner } from '../../Interfaces/Admin/ICarOwner';
import { ITechnician } from '../../Interfaces/Admin/ITechnician';
import { IActivitiesResponse } from '../../Interfaces/Admin/IActivities';
import { IDashboardStatisticsResponse } from '../../Interfaces/Admin/IStatistics';
import { IReport, IReportsResponse, IChatMessage, IUpdateReportDTO, ReportState } from '../../Interfaces/Admin/IReport';
import { IReview, IReviewResponse } from '../../Interfaces/Admin/IReview';
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
  getReports(): Observable<IReport[]> {
    console.log('Fetching reports from:', `${this.baseUrl}`);
    
    return this.http.get<IReportsResponse>(`${this.baseUrl}`).pipe(
      map(response => {
        console.log('Raw API response:', response);
        
        // Handle different response shapes
        let reports: any[] = [];
        
        if (response && typeof response === 'object') {
          if ('success' in response && response.success && response.data?.reports) {
            // New DTO structure: { success: true, data: { reports: [...] } }
            reports = response.data.reports;
          } else if (Array.isArray(response)) {
            // Direct array response
            reports = response;
          } else if ('data' in response && Array.isArray(response.data)) {
            // Alternative structure: { data: [...] }
            reports = response.data;
          }
        }
        
        console.log('Parsed reports:', reports);
        
        // Transform API response to match IReport interface
        return reports.map((report: any): IReport => {
          console.log('Raw report data:', report);
          console.log('Available fields:', Object.keys(report));
          console.log('requestId:', report.requestId);
          console.log('reportingEntityId:', report.reportingEntityId);
          console.log('reportedEntityId:', report.reportedEntityId);
          
          return {
            id: `${report.reportingUserId || ''}_${report.reportedUserId || ''}_${report.requestId || ''}`,
            reporterId: report.reportingUserId,
            reporterName: report.reportingUserRole === 'CarOwner' ? report.carOwnerName : report.technicianName,
            reporterRole: report.reportingUserRole,
            reportedUserName: report.reportedUserRole === 'CarOwner' ? report.carOwnerName : report.technicianName,
            reportType: 'User Report',
            reportReason: 'User Report',
            reportDescription: report.description,
            reportDate: report.createdAt || report.reportDate,
            status: 'Pending' as const,
            chatMessages: (report.messages || []).map((msg: any): IChatMessage => ({
              id: String(msg.messageId),
              senderId: msg.senderId,
              senderName: msg.senderName,
              senderRole: msg.senderId === report.reportingUserId ? report.reportingUserRole : report.reportedUserRole,
              message: msg.text,
              timestamp: msg.sentAt || msg.timestamp,
              isRead: !!msg.isSeen,
              messageType: 'text' as const
            })),
            // Include other optional properties
            description: report.description,
            createdAt: report.createdAt,
            reportingUserId: report.reportingUserId,
            reportingUserRole: report.reportingUserRole,
            reportingEntityId: report.reportingEntityId,
            reportedUserId: report.reportedUserId,
            reportedUserRole: report.reportedUserRole,
            reportedEntityId: report.reportedEntityId,
            requestId: report.requestId || report.reportingEntityId || 0, // Use reportingEntityId as fallback
            technicianName: report.technicianName,
            carOwnerName: report.carOwnerName,
            messages: report.messages
          };
        });
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching reports:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error body:', error.error);
        
        // Try to extract more detailed error information
        if (error.error) {
          try {
            const errorBody = typeof error.error === 'string' ? JSON.parse(error.error) : error.error;
            console.error('Parsed error body:', errorBody);
            if (errorBody.message) {
              console.error('Backend error message:', errorBody.message);
            }
          } catch (parseError) {
            console.error('Could not parse error body:', error.error);
          }
        }
        
        throw error;
      })
    );
  }

  getReportById(reportId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/reports/${reportId}`);
  }

  updateReportStatus(reportId: number, reportState: ReportState): Observable<any> {
    const updateData: IUpdateReportDTO = {
      reportId: reportId,
      reportState: reportState
    };
    
    return this.http.post<any>(`${this.baseUrl}/updateReportState`, updateData);
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

  // Technician Reviews Method
  getTechnicianReviews(technicianId: number): Observable<IReview[]> {
    return this.http.get<any>(`${this.baseUrl}/technician-reviews/${technicianId}`).pipe(
      map(response => {
        console.log('Raw reviews response:', response);
        
        if (response && response.success && response.data) {
          return response.data.map((review: any): IReview => ({
            id: review.id,
            rate: review.Rate || review.rate,
            comment: review.Comment || review.comment || '',
            carOwnerName: review.CarOwnerName || review.carOwnerName || '',
            technicianName: review.TechnicianName || review.technicianName || '',
            dateTime: review.DateTime || review.dateTime || '',
            // Map legacy fields for backward compatibility
            reviewerName: review.CarOwnerName || review.carOwnerName || '',
            rating: review.Rate || review.rate,
            date: review.DateTime || review.dateTime || '',
            isVerified: true
          }));
        }
        console.log('No reviews data found in response');
        return [];
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching technician reviews:', error);
        // Gracefully treat backend "no reviews" as empty list
        try {
          const message = typeof error?.error === 'object' ? (error.error?.message || '') : '';
          if (error.status === 500 && typeof message === 'string' && message.toLowerCase().includes('no reviews')) {
            return of([]);
          }
        } catch {}
        throw error;
      })
    );
  }

}
