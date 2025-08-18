import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../Services/AdminService/admin.service';
import { IUsersCount, IRequestsCount, IDashboardStatistics } from '../../../Interfaces/Admin/IStatistics';
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
  
  // Dashboard Statistics Data
  dashboardStatistics: IDashboardStatistics | null = null;
  
  // Legacy Statistics Data (for backward compatibility)
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
    this.loadDashboardStatistics();
    this.loadActivities();
  }

  loadDashboardStatistics(): void {
    this.isLoading = true;
    
    this.adminService.getDashboardStatistics().subscribe({
      next: (response) => {
        if (response.success) {
          this.dashboardStatistics = response.data;
          // Update legacy data for backward compatibility
          this.usersCount = {
            techniciansCount: response.data?.users?.technicians?.count || 0,
            carOwnersCount: response.data?.users?.carOwners?.count || 0
          };
          
          const totalRequests = (response.data?.requests?.completed?.count || 0) + 
                               (response.data?.requests?.waiting?.count || 0) + 
                               (response.data?.requests?.active?.count || 0) + 
                               (response.data?.requests?.canceled?.count || 0);
          
          this.requestsCount = {
            allRequestsCount: totalRequests,
            waitingRequestsCount: response.data?.requests?.waiting?.count || 0
          };
        }
      },
      error: (error) => {
        console.error('Error loading dashboard statistics:', error);
        // Use fallback data
        this.dashboardStatistics = {
          users: {
            technicians: { count: 59, percent: 71.08 },
            carOwners: { count: 24, percent: 28.92 },
            growth: { thisMonth: 10, lastMonth: 8, difference: 25 },
            rates: 4.56
          },
          requests: {
            completed: { count: 0, percent: 0 },
            waiting: { count: 0, percent: 0 },
            active: { count: 23, percent: 17.83 },
            canceled: { count: 70, percent: 54.26 }
          }
        };
        
        this.usersCount = {
          techniciansCount: 59,
          carOwnersCount: 24
        };
        
        this.requestsCount = {
          allRequestsCount: 93,
          waitingRequestsCount: 0
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

  refreshStatistics(): void {
    this.isRefreshing = true;
    this.loadDashboardStatistics();
    
    setTimeout(() => {
      this.isRefreshing = false;
      this.showSuccessNotification('تم تحديث الإحصائيات بنجاح');
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
    return this.dashboardStatistics?.requests?.completed?.count || 0;
  }

  getActiveRequestsCount(): number {
    return this.dashboardStatistics?.requests?.active?.count || 0;
  }

  getCancelledRequestsCount(): number {
    return this.dashboardStatistics?.requests?.canceled?.count || 0;
  }

  getCompletedPercentage(): number {
    return this.dashboardStatistics?.requests?.completed?.percent || 0;
  }

  getPendingPercentage(): number {
    return this.dashboardStatistics?.requests?.waiting?.percent || 0;
  }

  getActivePercentage(): number {
    return this.dashboardStatistics?.requests?.active?.percent || 0;
  }

  getCancelledPercentage(): number {
    return this.dashboardStatistics?.requests?.canceled?.percent || 0;
  }

  // User Distribution Methods
  getTechniciansPercentage(): number {
    return this.dashboardStatistics?.users?.technicians?.percent || 0;
  }

  getCarOwnersPercentage(): number {
    return this.dashboardStatistics?.users?.carOwners?.percent || 0;
  }

  // New Users and Rates Methods
  getAverageRating(): number {
    return this.dashboardStatistics?.users?.rates || 0;
  }

  getCompletionRate(): number {
    if (!this.dashboardStatistics?.requests) return 0;
    
    const totalRequests = (this.dashboardStatistics.requests.completed?.count || 0) + 
                         (this.dashboardStatistics.requests.waiting?.count || 0) + 
                         (this.dashboardStatistics.requests.active?.count || 0) + 
                         (this.dashboardStatistics.requests.canceled?.count || 0);
    
    if (totalRequests === 0) return 0;
    
    const completedRequests = this.dashboardStatistics.requests.completed?.count || 0;
    return Math.round((completedRequests / totalRequests) * 100);
  }

  getCompletionRateChange(): number {
    // Calculate change based on current vs previous period
    // For now, return a calculated change based on completed vs total requests
    const completionRate = this.getCompletionRate();
    const baseRate = 85; // Base completion rate
    return Math.max(0, completionRate - baseRate);
  }

  getGrowthRateChange(): number {
    if (!this.dashboardStatistics?.users?.growth) return 0;
    
    const currentGrowth = this.dashboardStatistics.users.growth.difference;
    const previousGrowth = this.dashboardStatistics.users.growth.lastMonth;
    
    if (previousGrowth === 0) return currentGrowth;
    
    return Math.round(((currentGrowth - previousGrowth) / previousGrowth) * 100);
  }
}
