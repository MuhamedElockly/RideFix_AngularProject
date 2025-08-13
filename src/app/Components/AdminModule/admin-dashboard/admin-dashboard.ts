import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../../Services/AdminService/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent implements OnInit {
  dashboardStats = {
    totalTechnicians: 0,
    totalCarOwners: 0,
    totalRequests: 0,
    activeRequests: 0,
    totalReports: 0,
    pendingReports: 0
  };

  currentDate = new Date();
  recentActivities = [
    {
      description: 'تم تسجيل فني جديد في النظام',
      time: 'منذ 5 دقائق'
    },
    {
      description: 'تم تحديث حالة طلب خدمة طوارئ',
      time: 'منذ 15 دقيقة'
    },
    {
      description: 'تم إضافة صاحب سيارة جديد',
      time: 'منذ ساعة'
    },
    {
      description: 'تم إكمال طلب صيانة',
      time: 'منذ ساعتين'
    },
    {
      description: 'تم استلام بلاغ جديد من صاحب سيارة',
      time: 'منذ 3 ساعات'
    },
    {
      description: 'تم حل بلاغ عن فني',
      time: 'منذ 4 ساعات'
    }
  ];

  isLoading = true;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    this.isLoading = true;
    this.adminService.getDashboardStats().subscribe({
      next: (stats) => {
        this.dashboardStats = stats;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard stats:', error);
        this.isLoading = false;
      }
    });
  }
}
