import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../Services/AdminService/admin.service';
import { ICategory, ICreateCategory, IUpdateCategory } from '../../../Interfaces/Admin/ICategory';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories-management.html',
  styleUrls: ['./categories-management.css']
})
export class CategoriesManagementComponent implements OnInit {
  categories: ICategory[] = [];
  filteredCategories: ICategory[] = [];
  pagedCategories: ICategory[] = [];
  
  // Pagination
  currentPage = 1;
  pageSize = 5; // Show only 5 records per page
  totalPages = 1;
  pageNumbers: number[] = [];
  
  // Search and Filters
  searchTerm = '';
  
  // Loading States
  isLoading = false;
  isSubmitting = false;
  
  // Modal States
  showAddModal = false;
  showEditModal = false;
  selectedCategory: ICategory | null = null;
  
  // Form Data
  newCategory: ICreateCategory = {
    name: '',
    description: ''
  };
  
  editCategory: IUpdateCategory = {};

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.adminService.getCategories().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.categories = response.data;
          this.applyFilters();
        } else {
          // Fallback to mock data for development
          this.loadMockCategories();
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.loadMockCategories();
        this.isLoading = false;
      }
    });
  }

  loadMockCategories(): void {
    this.categories = [
      {
        id: '1',
        name: 'Engine Maintenance',
        description: 'صيانة وإصلاح محرك السيارة'
      },
      {
        id: '2',
        name: 'Electrical Systems',
        description: 'أنظمة الكهرباء والإلكترونيات في السيارة'
      },
      {
        id: '3',
        name: 'Brake System',
        description: 'صيانة نظام الفرامل والكوابح'
      },
      {
        id: '4',
        name: 'Oil Change',
        description: 'تغيير زيت المحرك والفلتر'
      },
      {
        id: '5',
        name: 'Tire Service',
        description: 'خدمات الإطارات والجنط'
      }
    ];
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredCategories = this.categories.filter(category => {
      const matchesSearch = !this.searchTerm || 
        category.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return matchesSearch;
    });
    
    this.currentPage = 1;
    this.calculatePagination();
    this.updatePagedData();
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredCategories.length / this.pageSize);
    this.pageNumbers = this.generatePageNumbers();
  }

  generatePageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    
    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
      const end = Math.min(this.totalPages, start + maxVisiblePages - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }

  updatePagedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedCategories = this.filteredCategories.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedData();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedData();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedData();
    }
  }

  // Modal Management
  openAddModal(): void {
    this.resetNewCategoryForm();
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.resetNewCategoryForm();
  }

  openEditModal(category: ICategory): void {
    this.selectedCategory = category;
    this.editCategory = {
      name: category.name,
      description: category.description
    };
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedCategory = null;
    this.editCategory = {};
  }

  resetNewCategoryForm(): void {
    this.newCategory = {
      name: '',
      description: ''
    };
  }

  // CRUD Operations
  async createCategory(): Promise<void> {
    if (!this.validateCategoryForm(this.newCategory)) {
      return;
    }

    this.isSubmitting = true;
    
    try {
      const result = await this.adminService.createCategory(this.newCategory).toPromise();
      
      if (result?.success) {
        await Swal.fire({
          title: 'تم الإنشاء بنجاح!',
          text: 'تم إنشاء الفئة الجديدة بنجاح',
          icon: 'success',
          confirmButtonColor: '#27ae60',
          confirmButtonText: 'حسناً'
        });
        
        this.closeAddModal();
        this.loadCategories();
      } else {
        throw new Error('Failed to create category');
      }
    } catch (error) {
      await Swal.fire({
        title: 'خطأ!',
        text: 'حدث خطأ أثناء إنشاء الفئة',
        icon: 'error',
        confirmButtonColor: '#e74c3c',
        confirmButtonText: 'حسناً'
      });
    } finally {
      this.isSubmitting = false;
    }
  }

  async updateCategory(): Promise<void> {
    if (!this.selectedCategory || !this.validateCategoryForm(this.editCategory)) {
      return;
    }

    this.isSubmitting = true;
    
    try {
      const result = await this.adminService.updateCategory(this.selectedCategory.id, this.editCategory).toPromise();
      
      if (result?.success) {
        await Swal.fire({
          title: 'تم التحديث بنجاح!',
          text: 'تم تحديث الفئة بنجاح',
          icon: 'success',
          confirmButtonColor: '#27ae60',
          confirmButtonText: 'حسناً'
        });
        
        this.closeEditModal();
        this.loadCategories();
      } else {
        throw new Error('Failed to update category');
      }
    } catch (error) {
      await Swal.fire({
        title: 'خطأ!',
        text: 'حدث خطأ أثناء تحديث الفئة',
        icon: 'error',
        confirmButtonColor: '#e74c3c',
        confirmButtonText: 'حسناً'
      });
    } finally {
      this.isSubmitting = false;
    }
  }

  async deleteCategory(category: ICategory): Promise<void> {
    const result = await Swal.fire({
      title: 'تأكيد الحذف',
      text: `هل أنت متأكد من حذف الفئة "${category.name}"؟`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'نعم، احذف الفئة',
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
          title: 'جاري الحذف...',
          text: 'يرجى الانتظار',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        // Call API to delete category
        await this.adminService.deleteCategory(category.id).toPromise();
        
        // Show success message
        await Swal.fire({
          title: 'تم الحذف بنجاح!',
          text: `تم حذف الفئة "${category.name}" بنجاح`,
          icon: 'success',
          confirmButtonColor: '#27ae60',
          confirmButtonText: 'حسناً'
        });
        
        this.loadCategories();
      } catch (error) {
        // Show error message
        await Swal.fire({
          title: 'خطأ!',
          text: 'حدث خطأ أثناء حذف الفئة',
          icon: 'error',
          confirmButtonColor: '#e74c3c',
          confirmButtonText: 'حسناً'
        });
      }
    }
  }

  // Validation
  validateCategoryForm(category: ICreateCategory | IUpdateCategory): boolean {
    if (!category.name || category.name.trim() === '') {
      Swal.fire({
        title: 'خطأ في التحقق',
        text: 'يرجى إدخال اسم الفئة',
        icon: 'error',
        confirmButtonColor: '#e74c3c',
        confirmButtonText: 'حسناً'
      });
      return false;
    }

    if (!category.description || category.description.trim() === '') {
      Swal.fire({
        title: 'خطأ في التحقق',
        text: 'يرجى إدخال وصف الفئة',
        icon: 'error',
        confirmButtonColor: '#e74c3c',
        confirmButtonText: 'حسناً'
      });
      return false;
    }

    return true;
  }


}
