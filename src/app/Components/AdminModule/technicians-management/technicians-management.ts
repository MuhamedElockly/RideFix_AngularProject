import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../Services/AdminService/admin.service';
import { ITechnician } from '../../../Interfaces/Admin/ITechnician';
import { IReview } from '../../../Interfaces/Admin/IReview';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-technicians-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './technicians-management.html',
  styleUrls: ['./technicians-management.css']
})
export class TechniciansManagementComponent implements OnInit {
  technicians: ITechnician[] = [];
  filteredTechnicians: ITechnician[] = [];
  selectedTechnician: ITechnician | null = null;
  showUserDetails = false;
  
  // Reviews modal
  showReviewsModal = false;
  selectedUserReviews: IReview[] = [];
  selectedUserForReviews: ITechnician | null = null;
  isLoadingReviews = false;
  
  // Pagination
  currentPage = 1;
  pageSize = 5; // Default to 5 rows
  totalItems = 0;
  
  // Search and Filter
  searchTerm = '';
  selectedStatus = 'all';
  
  // Loading states
  isLoading = true;
  isLoadingDetails = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadTechnicians();
  }

  loadTechnicians(): void {
    this.isLoading = true;
    this.adminService.getTechnicians().subscribe({
      next: (response) => {
        this.technicians = response.data;
        this.filteredTechnicians = [...this.technicians];
        this.totalItems = this.technicians.length;
        this.isLoading = false;
        this.currentPage = 1; // Reset to first page when loading new data
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading technicians:', error);
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.technicians];

    // Apply search filter
    if (this.searchTerm.trim()) {
      filtered = filtered.filter(tech => 
        tech.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        tech.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (tech.phoneNumber && tech.phoneNumber.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }

    // Apply status filter
    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(tech => 
        this.selectedStatus === 'active' ? tech.isActivated : !tech.isActivated
      );
    }

    this.filteredTechnicians = filtered;
    this.totalItems = filtered.length;
    this.currentPage = 1;
    this.validateCurrentPage();
  }

  onSearch(): void {
    this.applyFilters();
  }

  onStatusChange(): void {
    this.applyFilters();
  }

  onPageSizeChange(): void {
    // Reset to first page when page size changes
    this.currentPage = 1;
    this.applyFilters();
  }

  // Ensure current page is valid after any changes
  private validateCurrentPage(): void {
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
  }

  viewUserDetails(technician: ITechnician): void {
    this.selectedTechnician = technician;
    this.showUserDetails = true;
    this.isLoadingDetails = true;
    
    // Simulate loading additional details
    setTimeout(() => {
      this.isLoadingDetails = false;
    }, 500);
  }

  closeUserDetails(): void {
    this.showUserDetails = false;
    this.selectedTechnician = null;
  }

  // Reviews modal methods
  viewUserReviews(technician: ITechnician): void {
    console.log('Opening reviews for technician:', technician);
    this.selectedUserForReviews = technician;
    this.showReviewsModal = true;
    this.isLoadingReviews = true;
    
    // Fetch reviews from API
    this.adminService.getTechnicianReviews(technician.id).subscribe({
      next: (reviews) => {
        console.log('Received reviews:', reviews);
        this.selectedUserReviews = reviews;
        this.isLoadingReviews = false;
      },
      error: (error) => {
        console.error('Error fetching technician reviews:', error);
        this.selectedUserReviews = [];
        this.isLoadingReviews = false;
        
        // Show error message
        Swal.fire({
          icon: 'error',
          title: 'خطأ في تحميل التقييمات',
          text: 'حدث خطأ أثناء تحميل تقييمات الفني. يرجى المحاولة مرة أخرى.',
          confirmButtonText: 'حسناً',
          confirmButtonColor: '#e74c3c'
        });
      }
    });
  }

  closeReviewsModal(): void {
    this.showReviewsModal = false;
    this.selectedUserForReviews = null;
    this.selectedUserReviews = [];
  }

  // Helper method to format date
  getFormattedDate(dateString: string | undefined): string {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  }

  private generateTempReviews(technician: ITechnician): IReview[] {
    const reviews: IReview[] = [];
    const reviewerNames = ['أحمد محمد', 'فاطمة علي', 'محمد حسن', 'سارة أحمد', 'علي محمود', 'نور الدين', 'مريم سعيد', 'خالد عبدالله'];
    const comments = [
      'خدمة ممتازة وسريعة، أنصح بالتعامل معه',
      'فني محترف وعمل دقيق',
      'سعر معقول وجودة عالية',
      'مؤدب ومحترم في التعامل',
      'عمل سريع ودقيق',
      'خدمة جيدة ولكن يمكن تحسينها',
      'فني ماهر ومحترف',
      'سعر مناسب وجودة ممتازة'
    ];

    // Generate 3-8 random reviews
    const numReviews = Math.floor(Math.random() * 6) + 3;
    
    for (let i = 0; i < numReviews; i++) {
      const rating = Math.floor(Math.random() * 3) + 3; // 3-5 stars
      const reviewDate = new Date();
      reviewDate.setDate(reviewDate.getDate() - Math.floor(Math.random() * 30)); // Random date within last 30 days
      
      reviews.push({
        id: i + 1,
        rate: rating,
        comment: comments[Math.floor(Math.random() * comments.length)],
        carOwnerName: reviewerNames[Math.floor(Math.random() * reviewerNames.length)],
        technicianName: technician.name,
        dateTime: reviewDate.toISOString(),
        // Legacy fields for backward compatibility
        reviewerName: reviewerNames[Math.floor(Math.random() * reviewerNames.length)],
        rating: rating,
        date: reviewDate.toLocaleDateString('ar-EG'),
        isVerified: Math.random() > 0.3 // 70% chance of being verified
      });
    }

    return reviews.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
  }

  onImageError(event: any): void {
    // Set a default avatar SVG when image fails to load
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMzUiIHI9IjE1IiBmaWxsPSIjQ0NDIi8+CjxwYXRoIGQ9Ik0yMCA3NUMyMCA2NSAzMCA1NSA0MCA1NUg2MEM3MCA1NSA4MCA2NSA4MCA3NVY4NUMyMCA4NSAyMCA3NSAyMCA3NVoiIGZpbGw9IiNDQ0MiLz4KPC9zdmc+';
  }

  // Block technician
  blockTechnician(technician: ITechnician): void {
    Swal.fire({
      title: 'تأكيد الحظر',
      html: `
        <div class="text-right">
          <p><strong>هل أنت متأكد من حظر الفني "${technician.name}"؟</strong></p>
          <hr>
          <p><strong>التقييم الحالي:</strong> <span class="text-danger">${technician.rate}/5</span></p>
          <p><strong>البريد الإلكتروني:</strong> ${technician.email}</p>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم، حظر',
      cancelButtonText: 'إلغاء',
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#6c757d',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Show loading state
        Swal.fire({
          title: 'جاري الحظر...',
          text: 'يرجى الانتظار',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        this.adminService.blockTechnician(technician.id).subscribe({
          next: (response) => {
            if (response.success) {
              // Update the technician status locally
              technician.isActivated = false;
              this.applyFilters();
              Swal.fire({
                icon: 'success',
                title: 'تم الحظر بنجاح',
                text: `تم حظر الفني "${technician.name}" بنجاح`,
                confirmButtonText: 'حسناً',
                confirmButtonColor: '#27ae60'
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'فشل في الحظر',
                text: 'فشل في حظر الفني: ' + response.message,
                confirmButtonText: 'حسناً',
                confirmButtonColor: '#e74c3c'
              });
            }
          },
          error: (error) => {
            console.error('Error blocking technician:', error);
            Swal.fire({
              icon: 'error',
              title: 'خطأ في النظام',
              text: 'حدث خطأ أثناء حظر الفني. يرجى المحاولة مرة أخرى.',
              confirmButtonText: 'حسناً',
              confirmButtonColor: '#e74c3c'
            });
          }
        });
      }
    });
  }

  // Activate blocked technician
  activateTechnician(technician: ITechnician): void {
    Swal.fire({
      title: 'تأكيد التفعيل',
      html: `
        <div class="text-right">
          <p><strong>هل أنت متأكد من تفعيل الفني "${technician.name}"؟</strong></p>
          <hr>
          <p><strong>البريد الإلكتروني:</strong> ${technician.email}</p>
          <p class="text-success"><i class="fas fa-check-circle"></i> سيتم تفعيل هذا الحساب مرة أخرى</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'نعم، تفعيل',
      cancelButtonText: 'إلغاء',
      confirmButtonColor: '#27ae60',
      cancelButtonColor: '#6c757d',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Show loading state
        Swal.fire({
          title: 'جاري التفعيل...',
          text: 'يرجى الانتظار',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        this.adminService.activateTechnician(technician.id).subscribe({
          next: (response) => {
            if (response.success) {
              // Update the technician status locally
              technician.isActivated = true;
              this.applyFilters();
              Swal.fire({
                icon: 'success',
                title: 'تم التفعيل بنجاح',
                text: `تم تفعيل الفني "${technician.name}" بنجاح`,
                confirmButtonText: 'حسناً',
                confirmButtonColor: '#27ae60'
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'فشل في التفعيل',
                text: 'فشل في تفعيل الفني: ' + response.message,
                confirmButtonText: 'حسناً',
                confirmButtonColor: '#e74c3c'
              });
            }
          },
          error: (error) => {
            console.error('Error activating technician:', error);
            Swal.fire({
              icon: 'error',
              title: 'خطأ في النظام',
              text: 'حدث خطأ أثناء تفعيل الفني. يرجى المحاولة مرة أخرى.',
              confirmButtonText: 'حسناً',
              confirmButtonColor: '#e74c3c'
            });
          }
        });
      }
    });
  }

  // Pagination methods
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get pagedTechnicians(): ITechnician[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredTechnicians.slice(start, start + this.pageSize);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    } else if (page > this.totalPages) {
      // If trying to go to a page beyond total pages, go to last page
      this.currentPage = this.totalPages;
    } else if (page < 1) {
      // If trying to go to a page below 1, go to first page
      this.currentPage = 1;
    }
    this.handlePageNavigation();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.handlePageNavigation();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
    this.handlePageNavigation();
  }

  // Handle edge cases when navigating
  private handlePageNavigation(): void {
    // Ensure current page is within valid range
    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
  }

  get pages(): number[] {
    const total = this.totalPages;
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    
    const current = this.currentPage;
    const pages: number[] = [];
    
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push(-1, total);
    } else if (current >= total - 3) {
      pages.push(1, -1);
      for (let i = total - 4; i <= total; i++) pages.push(i);
    } else {
      pages.push(1, -1);
      for (let i = current - 1; i <= current + 1; i++) pages.push(i);
      pages.push(-1, total);
    }
    
    return pages;
  }
}
