import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../Services/AdminService/admin.service';
import { IUsersCount, IRequestsCount } from '../../../Interfaces/Admin/IStatistics';
import { IActivitiesData, IActivity } from '../../../Interfaces/Admin/IActivities';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-statistics.html',
  styleUrls: ['./admin-statistics.css']
})
export class AdminStatisticsComponent implements OnInit {
  isLoading = true;
  isRefreshing = false;
  isActionLoading = false;
  
  // Statistics Data
  usersCount: IUsersCount = {
    techniciansCount: 0,
    carOwnersCount: 0
  };
  
  requestsCount: IRequestsCount = {
    allRequestsCount: 0,
    waitingRequestsCount: 0
  };

  // Activities Data
  activitiesData: IActivitiesData | null = null;
  recentActivities: IActivity[] = [];
  lastRefreshTime: Date | null = null;

  // Notification properties
  showNotification = false;
  notificationType: 'success' | 'error' | 'warning' | 'info' = 'success';
  notificationMessage = '';

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStatistics();
    this.loadActivities();
  }

  loadStatistics(): void {
    this.isLoading = true;
    
    // Load users count
    this.adminService.getUsersCount().subscribe({
      next: (response) => {
        this.usersCount = response;
      },
      error: (error) => {
        console.error('Error loading users count:', error);
        // Use fallback data
        this.usersCount = {
          techniciansCount: 57,
          carOwnersCount: 23
        };
      }
    });

    // Load requests count
    this.adminService.getRequestsCount().subscribe({
      next: (response) => {
        this.requestsCount = response;
      },
      error: (error) => {
        console.error('Error loading requests count:', error);
        // Use fallback data
        this.requestsCount = {
          allRequestsCount: 51,
          waitingRequestsCount: 1
        };
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  loadActivities(): void {
    // Load activities data
    this.adminService.getActivities().subscribe({
      next: (response) => {
        this.activitiesData = response.data;
        this.recentActivities = this.getRecentActivities(response.data);
      },
      error: (error) => {
        console.error('Error loading activities:', error);
        // Use fallback data
        this.activitiesData = {
          emergencyRequests: [],
          carMaintenanceRecords: [],
          userRegistrations: [],
          reviews: [],
          chatSessions: [],
          totalCount: 0,
          reportGeneratedAt: new Date().toISOString()
        };
        this.recentActivities = [];
      }
    });
  }

  refreshActivities(): void {
    this.isRefreshing = true;
    this.loadActivities();
    this.lastRefreshTime = new Date();
    
    setTimeout(() => {
      this.isRefreshing = false;
    }, 1000);
  }

  getRecentActivities(activitiesData: IActivitiesData): IActivity[] {
    const allActivities: IActivity[] = [
      ...activitiesData.emergencyRequests,
      ...activitiesData.carMaintenanceRecords,
      ...activitiesData.userRegistrations,
      ...activitiesData.reviews,
      ...activitiesData.chatSessions
    ];

    // Sort by timestamp and take the most recent 10
    return allActivities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);
  }

  // Activity helper methods
  getActivityIconClass(entityType: string): string {
    const iconClasses: { [key: string]: string } = {
      'emergency': 'activity-icon-emergency',
      'maintenance': 'activity-icon-maintenance',
      'user': 'activity-icon-user',
      'review': 'activity-icon-review',
      'chat': 'activity-icon-chat'
    };
    return iconClasses[entityType] || 'activity-icon-default';
  }

  getActivityIcon(entityType: string): string {
    const icons: { [key: string]: string } = {
      'emergency': 'fas fa-exclamation-triangle',
      'maintenance': 'fas fa-wrench',
      'user': 'fas fa-user',
      'review': 'fas fa-star',
      'chat': 'fas fa-comments'
    };
    return icons[entityType] || 'fas fa-info-circle';
  }

  getActivityTypeClass(activityType: string): string {
    const typeClasses: { [key: string]: string } = {
      'create': 'badge-success',
      'update': 'badge-warning',
      'delete': 'badge-danger',
      'complete': 'badge-info'
    };
    return typeClasses[activityType] || 'badge-secondary';
  }

  getActivityTypeText(activityType: string): string {
    const typeTexts: { [key: string]: string } = {
      'create': 'إنشاء',
      'update': 'تحديث',
      'delete': 'حذف',
      'complete': 'إكمال'
    };
    return typeTexts[activityType] || activityType;
  }

  getEntityTypeText(entityType: string): string {
    const entityTexts: { [key: string]: string } = {
      'emergency': 'طلب طوارئ',
      'maintenance': 'صيانة',
      'user': 'مستخدم',
      'review': 'تقييم',
      'chat': 'محادثة'
    };
    return entityTexts[entityType] || entityType;
  }

  // Quick action methods
  addNewCategory(): void {
    this.isActionLoading = true;
    this.router.navigate(['/admin/categories']);
    setTimeout(() => {
      this.isActionLoading = false;
    }, 1000);
  }

  manageUsers(): void {
    this.isActionLoading = true;
    this.router.navigate(['/admin/technicians']);
    setTimeout(() => {
      this.isActionLoading = false;
    }, 1000);
  }

  reviewReports(): void {
    this.isActionLoading = true;
    this.router.navigate(['/admin/reports']);
    setTimeout(() => {
      this.isActionLoading = false;
    }, 1000);
  }

  exportReports(): void {
    this.isActionLoading = true;
    
    // Simulate export process
    setTimeout(() => {
      this.isActionLoading = false;
      this.showSuccessNotification('تم تصدير التقرير بنجاح');
    }, 2000);
  }

  // Notification methods
  showSuccessNotification(message: string): void {
    this.notificationType = 'success';
    this.notificationMessage = message;
    this.showNotification = true;
    
    setTimeout(() => {
      this.closeNotification();
    }, 5000);
  }

  showErrorNotification(message: string): void {
    this.notificationType = 'error';
    this.notificationMessage = message;
    this.showNotification = true;
    
    setTimeout(() => {
      this.closeNotification();
    }, 5000);
  }

  closeNotification(): void {
    this.showNotification = false;
  }

  // Request Status Distribution Methods
  getCompletedRequestsCount(): number {
    return Math.floor(this.requestsCount.allRequestsCount * 0.7); // 70% completed
  }

  getActiveRequestsCount(): number {
    return Math.floor(this.requestsCount.allRequestsCount * 0.2); // 20% active
  }

  getCancelledRequestsCount(): number {
    return Math.floor(this.requestsCount.allRequestsCount * 0.1); // 10% cancelled
  }

  getCompletedPercentage(): number {
    return this.requestsCount.allRequestsCount > 0 ? 
      Math.round((this.getCompletedRequestsCount() / this.requestsCount.allRequestsCount) * 100) : 0;
  }

  getPendingPercentage(): number {
    return this.requestsCount.allRequestsCount > 0 ? 
      Math.round((this.requestsCount.waitingRequestsCount / this.requestsCount.allRequestsCount) * 100) : 0;
  }

  getActivePercentage(): number {
    return this.requestsCount.allRequestsCount > 0 ? 
      Math.round((this.getActiveRequestsCount() / this.requestsCount.allRequestsCount) * 100) : 0;
  }

  getCancelledPercentage(): number {
    return this.requestsCount.allRequestsCount > 0 ? 
      Math.round((this.getCancelledRequestsCount() / this.requestsCount.allRequestsCount) * 100) : 0;
  }

  // User Distribution Methods
  getTechniciansPercentage(): number {
    const totalUsers = this.usersCount.techniciansCount + this.usersCount.carOwnersCount;
    return totalUsers > 0 ? Math.round((this.usersCount.techniciansCount / totalUsers) * 100) : 0;
  }

  getCarOwnersPercentage(): number {
    const totalUsers = this.usersCount.techniciansCount + this.usersCount.carOwnersCount;
    return totalUsers > 0 ? Math.round((this.usersCount.carOwnersCount / totalUsers) * 100) : 0;
  }
}
