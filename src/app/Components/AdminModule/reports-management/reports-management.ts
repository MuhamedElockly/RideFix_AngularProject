import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../Services/AdminService/admin.service';
import { IReport, ReportState } from '../../../Interfaces/Admin/IReport';
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
  
  // No static mock data; rely solely on API

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    console.log('Component initialized, clearing any existing data');
    this.clearAllData();
    this.loadReports();
  }

  clearAllData() {
    console.log('Clearing all data...');
    this.reports = [];
    this.filteredReports = [];
    this.selectedReport = null;
    this.currentPage = 1;
    this.totalPages = 1;
    this.searchTerm = '';
    this.statusFilter = '';
    this.roleFilter = '';
    console.log('Data cleared, current state:', {
      reports: this.reports,
      filteredReports: this.filteredReports,
      selectedReport: this.selectedReport
    });
  }

  // Test method to verify empty state
  testEmptyState() {
    console.log('Testing empty state...');
    this.clearAllData();
    this.applyFilters();
    console.log('Empty state test completed. Reports count:', this.reports.length);
  }

  loadReports() {
    console.log('Loading reports...');
    console.log('Current reports state before API call:', this.reports);
    this.isLoading = true;
    
    this.adminService.getReports().subscribe({
      next: (reports) => {
        console.log('Reports loaded successfully:', reports);
        this.reports = reports || [];
        this.filteredReports = reports || [];
        console.log('Reports state after API success:', this.reports);
        this.isLoading = false;
        this.applyFilters(); // Apply filters after loading
      },
      error: (error) => {
        console.error('Error in loadReports:', error);
        console.error('Error details:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          error: error.error
        });
        
        // Try to extract backend error message
        if (error.error) {
          try {
            const errorBody = typeof error.error === 'string' ? JSON.parse(error.error) : error.error;
            console.error('Backend error details:', errorBody);
          } catch (parseError) {
            console.error('Raw error body:', error.error);
          }
        }
        
        console.log('API error, showing empty list:', error);
        this.reports = [];
        this.filteredReports = [];
        console.log('Reports state after API error (should be empty):', this.reports);
        this.isLoading = false;
        this.applyFilters(); // Apply filters after setting empty data
      }
    });
  }

  hasReports(): boolean {
    return this.reports && this.reports.length > 0;
  }

  hasFilteredReports(): boolean {
    return this.filteredReports && this.filteredReports.length > 0;
  }

  applyFilters() {
    let filtered = [...this.reports];
    
    // Search filter
    if (this.searchTerm) {
      filtered = filtered.filter(report => 
        (report.reporterName && report.reporterName.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (report.reportedUserName && report.reportedUserName.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (report.reportReason && report.reportReason.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (report.description && report.description.toLowerCase().includes(this.searchTerm.toLowerCase()))
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

  viewReportDetails(report: IReport): void {
    this.selectedReport = report;
    this.showChat = false; // Reset chat visibility
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
    // Check if it's the new message structure or legacy
    if (message.senderId) {
      return message.senderId === this.selectedReport?.reportingUserId || message.senderId === this.selectedReport?.reporterId;
    }
    return false;
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

        // Always call the correct Admin endpoints with numeric entity IDs
        // Prefer the numeric id passed in; if invalid, derive from selectedReport and userType
        const parsedId = Number(userId);
        
        console.log('Blocking user:', {
          userId,
          userName,
          userType,
          parsedId,
          selectedReport: this.selectedReport
        });

        if (userType === 'Technician') {
          // For technician, use the passed ID or derive from the report
          const technicianId = !isNaN(parsedId) && parsedId > 0 ? parsedId : 0;
          console.log('Blocking technician with ID:', technicianId);
          
          if (!technicianId || technicianId <= 0) {
            throw new Error('Invalid technician id');
          }
          await this.adminService.blockTechnician(technicianId).toPromise();
        } else if (userType === 'CarOwner') {
          // For car owner, use the passed ID or derive from the report
          const carOwnerId = !isNaN(parsedId) && parsedId > 0 ? parsedId : 0;
          console.log('Blocking car owner with ID:', carOwnerId);
          
          if (!carOwnerId || carOwnerId <= 0) {
            throw new Error('Invalid car owner id');
          }
          await this.adminService.blockCarOwner(carOwnerId).toPromise();
        } else {
          // Unknown type; do not call unsupported endpoint
          throw new Error('Unsupported user type');
        }
        
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
        console.error('Error blocking user:', error);
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



  async resolveReport(requestId: number) {
    console.log('resolveReport called with requestId:', requestId);
    console.log('selectedReport:', this.selectedReport);
    
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
        Swal.fire({
          title: 'جاري الحل...',
          text: 'يرجى الانتظار',
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading()
        });

        console.log('Calling updateReportStatus with:', { requestId, state: ReportState.Approved });
        this.adminService.updateReportStatus(requestId, ReportState.Approved).subscribe({
          next: () => {
            if (this.selectedReport) {
              this.selectedReport.status = 'Resolved';
              this.selectedReport.resolutionDate = new Date();
              this.selectedReport.resolvedBy = 'Admin';
              this.applyFilters();
              this.closeReportModal();
            }
            Swal.fire({
              title: 'تم الحل بنجاح!',
              text: 'تم حل البلاغ بنجاح',
              icon: 'success',
              confirmButtonColor: '#27ae60',
              confirmButtonText: 'حسناً'
            });
          },
          error: (error) => {
            console.error('Error resolving report:', error);
            Swal.fire({
              title: 'خطأ!',
              text: 'حدث خطأ أثناء حل البلاغ',
              icon: 'error',
              confirmButtonColor: '#e74c3c',
              confirmButtonText: 'حسناً'
            });
          }
        });
      } catch (error) {
        console.error('Error resolving report:', error);
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

  async dismissReport(requestId: number) {
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
        Swal.fire({
          title: 'جاري الرفض...',
          text: 'يرجى الانتظار',
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading()
        });

        this.adminService.updateReportStatus(requestId, ReportState.Rejected).subscribe({
          next: () => {
            if (this.selectedReport) {
              this.selectedReport.status = 'Dismissed';
              this.selectedReport.resolutionDate = new Date();
              this.selectedReport.resolvedBy = 'Admin';
              this.applyFilters();
              this.closeReportModal();
            }
            Swal.fire({
              title: 'تم الرفض بنجاح!',
              text: 'تم رفض البلاغ بنجاح',
              icon: 'success',
              confirmButtonColor: '#f39c12',
              confirmButtonText: 'حسناً'
            });
          },
          error: (error) => {
            console.error('Error dismissing report:', error);
            Swal.fire({
              title: 'خطأ!',
              text: 'حدث خطأ أثناء رفض البلاغ',
              icon: 'error',
              confirmButtonColor: '#e74c3c',
              confirmButtonText: 'حسناً'
            });
          }
        });
      } catch (error) {
        console.error('Error dismissing report:', error);
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
    if (!status) return '';
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Resolved': return 'status-resolved';
      case 'Dismissed': return 'status-dismissed';
      default: return '';
    }
  }

  getStatusText(status: string): string {
    if (!status) return 'غير محدد';
    switch (status) {
      case 'Pending': return 'قيد الانتظار';
      case 'Resolved': return 'تم الحل';
      case 'Dismissed': return 'مرفوض';
      default: return status;
    }
  }

  getRoleText(role: string): string {
    if (!role) return 'غير محدد';
    switch (role) {
      case 'CarOwner': return 'صاحب سيارة';
      case 'Technician': return 'فني';
      default: return role;
    }
  }

  // Helper method to check if a role is a technician
  isTechnicianRole(role: string | undefined): boolean {
    if (!role) return false;
    const roleLower = role.toLowerCase();
    return roleLower === 'technician' || roleLower === 'فني' || roleLower === 'tech';
  }

  // Helper method to check if a role is a car owner
  isCarOwnerRole(role: string | undefined): boolean {
    if (!role) return false;
    const roleLower = role.toLowerCase();
    return roleLower === 'carowner' || roleLower === 'صاحب سيارة' || roleLower === 'owner';
  }

  getFormattedDate(dateInput: any, format: string = 'short'): string {
    try {
      // Handle null, undefined, or empty values
      if (!dateInput) {
        return 'تاريخ غير متوفر';
      }

      let date: Date;
      
      if (typeof dateInput === 'string') {
        // Handle API date format: "2025-08-18T19:05:36.1601119"
        // Also handle already formatted dates like "Monday, August 18, 2025 at 7:05:36 PM GMT+03:00"
        if (dateInput.includes('GMT') || dateInput.includes('UTC')) {
          // This is already a formatted date string, try to parse it
          date = new Date(dateInput);
        } else {
          // Handle API format
          const cleanDate = dateInput.replace('T', ' ').split('.')[0];
          date = new Date(cleanDate);
        }
      } else if (dateInput instanceof Date) {
        date = dateInput;
      } else {
        console.warn('Invalid date input:', dateInput);
        return 'تاريخ غير صحيح';
      }

      if (isNaN(date.getTime())) {
        console.warn('Invalid date after parsing:', dateInput);
        return 'تاريخ غير صحيح';
      }

      // Format the date based on the requested format
      switch (format) {
        case 'full':
          return date.toLocaleDateString('ar-SA', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
        case 'shortTime':
          return date.toLocaleTimeString('ar-SA', {
            hour: '2-digit',
            minute: '2-digit'
          });
        case 'short':
        default:
          return date.toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          });
      }
    } catch (error) {
      console.error('Error formatting date:', error, 'Input:', dateInput);
      return 'تاريخ غير صحيح';
    }
  }
}
