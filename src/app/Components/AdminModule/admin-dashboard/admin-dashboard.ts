import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../../Services/AdminService/admin.service';
import { IUsersCount, IRequestsCount, IDashboardStatistics } from '../../../Interfaces/Admin/IStatistics';
import { IActivity, IActivitiesData } from '../../../Interfaces/Admin/IActivities';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  dashboardStats: IDashboardStatistics | null = null;

  currentDate = new Date();
  recentActivities: IActivity[] = [];
  activitiesData: IActivitiesData | null = null;

  isLoading = true;
  isRefreshing = false;
  lastRefreshTime: Date | null = null;
  private autoRefreshSubscription?: Subscription;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDashboardStats();
    this.loadActivities();
    this.startAutoRefresh();
  }

  loadDashboardStats(): void {
    this.isLoading = true;
    
    // Load dashboard statistics from the new endpoint
    this.adminService.getDashboardStatistics().subscribe({
      next: (response) => {
        if (response.success) {
          this.dashboardStats = response.data;
        } else {
          console.error('Failed to load dashboard statistics:', response.message);
          this.setFallbackData();
        }
      },
      error: (error) => {
        console.error('Error loading dashboard statistics:', error);
        this.setFallbackData();
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  private setFallbackData(): void {
    this.dashboardStats = {
      users: {
        technicians: { count: 57, percent: 65.59 },
        carOwners: { count: 23, percent: 34.41 },
        growth: { thisMonth: 10, lastMonth: 0, difference: 100 },
        rates: 4.56
      },
      requests: {
        completed: { count: 0, percent: 0 },
        waiting: { count: 1, percent: 1.56 },
        active: { count: 23, percent: 35.94 },
        canceled: { count: 38, percent: 59.38 }
      }
    };
  }

  loadActivities(): void {
    this.adminService.getActivities(12).subscribe({
      next: (response) => {
        if (response.success) {
          this.activitiesData = response.data;
          this.recentActivities = this.combineAndSortActivities(response.data);
          this.lastRefreshTime = new Date();
        }
      },
      error: (error) => {
        console.error('Error loading activities:', error);
        // Clear activities on error
        this.recentActivities = [];
        this.activitiesData = null;
      }
    });
  }

  refreshActivities(): void {
    this.isRefreshing = true;
    this.adminService.getActivities(12).subscribe({
      next: (response) => {
        if (response.success) {
          this.activitiesData = response.data;
          this.recentActivities = this.combineAndSortActivities(response.data);
          this.lastRefreshTime = new Date();
        }
        this.isRefreshing = false;
      },
      error: (error) => {
        console.error('Error refreshing activities:', error);
        this.isRefreshing = false;
      }
    });
  }

  private combineAndSortActivities(data: IActivitiesData): IActivity[] {
    const allActivities: IActivity[] = [
      ...data.emergencyRequests,
      ...data.carMaintenanceRecords,
      ...data.userRegistrations,
      ...data.reviews,
      ...data.chatSessions
    ];

    // Sort by timestamp (newest first)
    return allActivities.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return dateB - dateA;
    });
  }

  getActivityIcon(entityType: string): string {
    switch (entityType) {
      case 'EmergencyRequest':
        return 'fas fa-exclamation-triangle';
      case 'CarMaintenanceRecord':
        return 'fas fa-wrench';
      case 'UserRegistration':
        return 'fas fa-user-plus';
      case 'Review':
        return 'fas fa-star';
      case 'ChatSession':
        return 'fas fa-comments';
      default:
        return 'fas fa-circle';
    }
  }

  getActivityIconClass(entityType: string): string {
    switch (entityType) {
      case 'EmergencyRequest':
        return 'activity-icon-emergency';
      case 'CarMaintenanceRecord':
        return 'activity-icon-maintenance';
      case 'UserRegistration':
        return 'activity-icon-registration';
      case 'Review':
        return 'activity-icon-review';
      case 'ChatSession':
        return 'activity-icon-chat';
      default:
        return 'activity-icon-default';
    }
  }

  getActivityTypeClass(activityType: string): string {
    switch (activityType) {
      case 'Completed':
        return 'badge bg-success';
      case 'Created':
        return 'badge bg-primary';
      case 'Updated':
        return 'badge bg-warning';
      case 'Deleted':
        return 'badge bg-danger';
      case 'Pending':
        return 'badge bg-info';
      default:
        return 'badge bg-secondary';
    }
  }

  getActivityTypeText(activityType: string): string {
    switch (activityType) {
      case 'Completed':
        return 'مكتمل';
      case 'Created':
        return 'تم إنشاؤه';
      case 'Updated':
        return 'تم تحديثه';
      case 'Deleted':
        return 'تم حذفه';
      case 'Pending':
        return 'قيد الانتظار';
      default:
        return activityType;
    }
  }

  getEntityTypeText(entityType: string): string {
    switch (entityType) {
      case 'EmergencyRequest':
        return 'طلب طوارئ';
      case 'CarMaintenanceRecord':
        return 'سجل صيانة';
      case 'UserRegistration':
        return 'تسجيل مستخدم';
      case 'Review':
        return 'تقييم';
      case 'ChatSession':
        return 'جلسة محادثة';
      default:
        return entityType;
    }
  }

  private startAutoRefresh(): void {
    // Auto-refresh activities every 5 minutes (300000 ms)
    this.autoRefreshSubscription = interval(300000).subscribe(() => {
      this.refreshActivities();
    });
  }

  ngOnDestroy(): void {
    if (this.autoRefreshSubscription) {
      this.autoRefreshSubscription.unsubscribe();
    }
  }
}
