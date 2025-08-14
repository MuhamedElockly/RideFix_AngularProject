import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../Services/AdminService/admin.service';
import { IReport } from '../../../Interfaces/Admin/IReport';
import { IAdminUser } from '../../../Interfaces/Admin/IAdminUser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reports-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports-management.html',
  styleUrls: ['./reports-management.css']
})
export class ReportsManagementComponent implements OnInit {
  reports: IReport[] = [];
  filteredReports: IReport[] = [];
  selectedReport: IReport | null = null;
  isLoading = true;
  showChat = false;
  
  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  
  // Search and filter
  searchTerm = '';
  statusFilter = '';
  roleFilter = '';
  
  // Mock data for demonstration
  mockReports: IReport[] = [
    {
      id: '1',
      reporterId: 'user1',
      reporterName: 'أحمد محمد',
      reporterRole: 'CarOwner',
      reportedUserId: 'tech1',
      reportedUserName: 'محمد علي',
      reportedUserRole: 'Technician',
      reportType: 'Poor Service',
      reportReason: 'خدمة سيئة',
      reportDescription: 'الفني لم يحضر في الموعد المحدد وتأخر كثيراً',
      reportDate: new Date('2024-01-15'),
      status: 'Pending',
      chatMessages: [
        {
          id: '1',
          senderId: 'user1',
          senderName: 'أحمد محمد',
          senderRole: 'CarOwner',
          message: 'مرحبا، متى ستصل للفحص؟',
          timestamp: new Date('2024-01-15T10:00:00'),
          isRead: true,
          messageType: 'text'
        },
        {
          id: '2',
          senderId: 'tech1',
          senderName: 'محمد علي',
          senderRole: 'Technician',
          message: 'سأصل خلال 30 دقيقة إن شاء الله',
          timestamp: new Date('2024-01-15T10:05:00'),
          isRead: true,
          messageType: 'text'
        },
        {
          id: '3',
          senderId: 'user1',
          senderName: 'أحمد محمد',
          senderRole: 'CarOwner',
          message: 'حسناً، سأنتظرك',
          timestamp: new Date('2024-01-15T10:06:00'),
          isRead: true,
          messageType: 'text'
        },
        {
          id: '4',
          senderId: 'tech1',
          senderName: 'محمد علي',
          senderRole: 'Technician',
          message: 'عذراً، تأخرت قليلاً بسبب زحام الطريق',
          timestamp: new Date('2024-01-15T10:45:00'),
          isRead: true,
          messageType: 'text'
        },
        {
          id: '5',
          senderId: 'user1',
          senderName: 'أحمد محمد',
          senderRole: 'CarOwner',
          message: 'هذا غير مقبول، كنت تنتظر منذ ساعة',
          timestamp: new Date('2024-01-15T11:00:00'),
          isRead: true,
          messageType: 'text'
        }
      ]
    },
    {
      id: '2',
      reporterId: 'tech2',
      reporterName: 'فاطمة أحمد',
      reporterRole: 'Technician',
      reportedUserId: 'owner1',
      reportedUserName: 'علي حسن',
      reportedUserRole: 'CarOwner',
      reportType: 'Inappropriate Behavior',
      reportReason: 'سلوك غير لائق',
      reportDescription: 'صاحب السيارة كان يتصرف بشكل غير لائق أثناء الخدمة',
      reportDate: new Date('2024-01-14'),
      status: 'Pending',
      chatMessages: [
        {
          id: '1',
          senderId: 'tech2',
          senderName: 'فاطمة أحمد',
          senderRole: 'Technician',
          message: 'مرحبا، أنا الفنية فاطمة. سأبدأ بفحص السيارة الآن',
          timestamp: new Date('2024-01-14T14:00:00'),
          isRead: true,
          messageType: 'text'
        },
        {
          id: '2',
          senderId: 'owner1',
          senderName: 'علي حسن',
          senderRole: 'CarOwner',
          message: 'أهلاً وسهلاً، تفضلي بالفحص',
          timestamp: new Date('2024-01-14T14:02:00'),
          isRead: true,
          messageType: 'text'
        },
        {
          id: '3',
          senderId: 'tech2',
          senderName: 'فاطمة أحمد',
          senderRole: 'Technician',
          message: 'أرى أن هناك مشكلة في الفرامل. سأحتاج وقت إضافي',
          timestamp: new Date('2024-01-14T14:15:00'),
          isRead: true,
          messageType: 'text'
        },
        {
          id: '4',
          senderId: 'owner1',
          senderName: 'علي حسن',
          senderRole: 'CarOwner',
          message: 'لا بأس، خذي وقتك',
          timestamp: new Date('2024-01-14T14:16:00'),
          isRead: true,
          messageType: 'text'
        },
        {
          id: '5',
          senderId: 'owner1',
          senderName: 'علي حسن',
          senderRole: 'CarOwner',
          message: 'هل يمكنك إخباري بالتكلفة التقريبية؟',
          timestamp: new Date('2024-01-14T14:30:00'),
          isRead: true,
          messageType: 'text'
        },
        {
          id: '6',
          senderId: 'tech2',
          senderName: 'فاطمة أحمد',
          senderRole: 'Technician',
          message: 'التكلفة ستكون حوالي 200 ريال',
          timestamp: new Date('2024-01-14T14:32:00'),
          isRead: true,
          messageType: 'text'
        },
        {
          id: '7',
          senderId: 'owner1',
          senderName: 'علي حسن',
          senderRole: 'CarOwner',
          message: 'هذا مبلغ كبير! لماذا لم تخبريني مسبقاً؟',
          timestamp: new Date('2024-01-14T14:35:00'),
          isRead: true,
          messageType: 'text'
        },
        {
          id: '8',
          senderId: 'tech2',
          senderName: 'فاطمة أحمد',
          senderRole: 'Technician',
          message: 'عذراً، كان يجب علي إخبارك أولاً',
          timestamp: new Date('2024-01-14T14:36:00'),
          isRead: true,
          messageType: 'text'
        }
      ]
    },
    {
      id: '3',
      reporterId: 'user3',
      reporterName: 'سارة محمود',
      reporterRole: 'CarOwner',
      reportedUserId: 'tech3',
      reportedUserName: 'حسن أحمد',
      reportedUserRole: 'Technician',
      reportType: 'No Show',
      reportReason: 'عدم الحضور',
      reportDescription: 'الفني لم يحضر ولم يتصل لتوضيح السبب',
      reportDate: new Date('2024-01-13'),
      status: 'Resolved'
    }
  ];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.isLoading = true;
    // Try to load from API first, fallback to mock data
    this.adminService.getReports().subscribe({
      next: (reports) => {
        this.reports = reports;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        console.log('Using mock data due to API error:', error);
        // Fallback to mock data if API is not available
        this.reports = [...this.mockReports];
        this.applyFilters();
        this.isLoading = false;
      }
    });
  }

  applyFilters() {
    let filtered = [...this.reports];
    
    // Search filter
    if (this.searchTerm) {
      filtered = filtered.filter(report => 
        report.reporterName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        report.reportedUserName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        report.reportReason.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    
    // Status filter
    if (this.statusFilter) {
      filtered = filtered.filter(report => report.status === this.statusFilter);
    }
    
    // Role filter
    if (this.roleFilter) {
      filtered = filtered.filter(report => report.reportedUserRole === this.roleFilter);
    }
    
    this.filteredReports = filtered;
    this.currentPage = 1;
    this.calculatePagination();
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.filteredReports.length / this.pageSize);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
  }

  get pagedReports() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredReports.slice(startIndex, startIndex + this.pageSize);
  }

  get pageNumbers() {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  viewReportDetails(report: IReport) {
    this.selectedReport = report;
  }

  closeReportModal() {
    this.selectedReport = null;
    this.showChat = false;
  }

  toggleChat() {
    this.showChat = !this.showChat;
  }

  getChatMessages() {
    return this.selectedReport?.chatMessages || [];
  }

  isOwnMessage(message: any): boolean {
    return message.senderId === this.selectedReport?.reporterId;
  }

  async blockUser(userId: string, userName: string, userType: string) {
    const userTypeText = userType === 'Technician' ? 'الفني' : 'صاحب السيارة';
    const result = await Swal.fire({
      title: 'تأكيد الحظر',
      text: `هل أنت متأكد من حظر ${userTypeText} "${userName}"؟`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#6c757d',
      confirmButtonText: `نعم، حظر ${userTypeText}`,
      cancelButtonText: 'إلغاء',
      reverseButtons: true,
      customClass: {
        title: 'swal-title-rtl'
      }
    });

    if (result.isConfirmed) {
      try {
        // Show loading state
        Swal.fire({
          title: 'جاري الحظر...',
          text: 'يرجى الانتظار',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        // Call API to block user
        await this.adminService.blockUserAccount(userId, `Blocked due to report - ${userType}`).toPromise();
        
        // Show success message
        Swal.fire({
          title: 'تم الحظر بنجاح!',
          text: `تم حظر ${userTypeText} "${userName}" بنجاح`,
          icon: 'success',
          confirmButtonColor: '#27ae60',
          confirmButtonText: 'حسناً'
        });
        
        this.closeReportModal();
        this.loadReports();
      } catch (error) {
        // Show error message
        Swal.fire({
          title: 'خطأ!',
          text: `حدث خطأ أثناء حظر ${userTypeText}`,
          icon: 'error',
          confirmButtonColor: '#e74c3c',
          confirmButtonText: 'حسناً'
        });
      }
    }
  }



  async resolveReport(reportId: string) {
    const result = await Swal.fire({
      title: 'حل البلاغ',
      text: 'هل تريد حل هذا البلاغ؟',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#27ae60',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'نعم، حل البلاغ',
      cancelButtonText: 'إلغاء',
      reverseButtons: true,
      customClass: {
        title: 'swal-title-rtl'
      }
    });

    if (result.isConfirmed) {
      try {
        // Show loading state
        Swal.fire({
          title: 'جاري الحل...',
          text: 'يرجى الانتظار',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        await this.adminService.updateReportStatus(reportId, 'Resolved').toPromise();
        
        // Update local data
        const report = this.reports.find(r => r.id === reportId);
        if (report) {
          report.status = 'Resolved';
          report.resolutionDate = new Date();
          report.resolvedBy = 'Admin';
          this.applyFilters();
          this.closeReportModal();
        }
        
        // Show success message
        Swal.fire({
          title: 'تم الحل بنجاح!',
          text: 'تم حل البلاغ بنجاح',
          icon: 'success',
          confirmButtonColor: '#27ae60',
          confirmButtonText: 'حسناً'
        });
      } catch (error) {
        // Show error message
        Swal.fire({
          title: 'خطأ!',
          text: 'حدث خطأ أثناء حل البلاغ',
          icon: 'error',
          confirmButtonColor: '#e74c3c',
          confirmButtonText: 'حسناً'
        });
      }
    }
  }

  async dismissReport(reportId: string) {
    const result = await Swal.fire({
      title: 'رفض البلاغ',
      text: 'هل تريد رفض هذا البلاغ؟',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#f39c12',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'نعم، ارفض البلاغ',
      cancelButtonText: 'إلغاء',
      reverseButtons: true,
      customClass: {
        title: 'swal-title-rtl'
      }
    });

    if (result.isConfirmed) {
      try {
        // Show loading state
        Swal.fire({
          title: 'جاري الرفض...',
          text: 'يرجى الانتظار',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        await this.adminService.updateReportStatus(reportId, 'Dismissed').toPromise();
        
        // Update local data
        const report = this.reports.find(r => r.id === reportId);
        if (report) {
          report.status = 'Dismissed';
          report.resolutionDate = new Date();
          report.resolvedBy = 'Admin';
          this.applyFilters();
          this.closeReportModal();
        }
        
        // Show success message
        Swal.fire({
          title: 'تم الرفض بنجاح!',
          text: 'تم رفض البلاغ بنجاح',
          icon: 'success',
          confirmButtonColor: '#f39c12',
          confirmButtonText: 'حسناً'
        });
      } catch (error) {
        // Show error message
        Swal.fire({
          title: 'خطأ!',
          text: 'حدث خطأ أثناء رفض البلاغ',
          icon: 'error',
          confirmButtonColor: '#e74c3c',
          confirmButtonText: 'حسناً'
        });
      }
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Resolved': return 'status-resolved';
      case 'Dismissed': return 'status-dismissed';
      default: return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'Pending': return 'قيد الانتظار';
      case 'Resolved': return 'تم الحل';
      case 'Dismissed': return 'مرفوض';
      default: return status;
    }
  }

  getRoleText(role: string): string {
    switch (role) {
      case 'CarOwner': return 'صاحب سيارة';
      case 'Technician': return 'فني';
      default: return role;
    }
  }
}
