import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../Services/AdminService/admin.service';
import { IAdminUser } from '../../../Interfaces/Admin/IAdminUser';

@Component({
  selector: 'app-car-owners-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './car-owners-management.html',
  styleUrls: ['./car-owners-management.css']
})
export class CarOwnersManagementComponent implements OnInit {
  carOwners: IAdminUser[] = [];
  filteredCarOwners: IAdminUser[] = [];
  selectedCarOwner: IAdminUser | null = null;
  showUserDetails = false;
  
  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  
  // Search and Filter
  searchTerm = '';
  selectedStatus = 'all';
  
  // Loading states
  isLoading = true;
  isLoadingDetails = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadCarOwners();
  }

  loadCarOwners(): void {
    this.isLoading = true;
    this.adminService.getAllUsers().subscribe({
      next: (response) => {
        // Filter only car owners
        this.carOwners = response.data.filter((user: IAdminUser) => 
          user.role.toLowerCase().includes('carowner') || 
          user.role.toLowerCase().includes('صاحب سيارة') ||
          user.role.toLowerCase().includes('car owner')
        );
        this.filteredCarOwners = [...this.carOwners];
        this.totalItems = this.carOwners.length;
        this.isLoading = false;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading car owners:', error);
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.carOwners];

    // Apply search filter
    if (this.searchTerm.trim()) {
      filtered = filtered.filter(owner => 
        owner.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        owner.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        owner.phone?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(owner => owner.status === this.selectedStatus);
    }

    this.filteredCarOwners = filtered;
    this.totalItems = filtered.length;
    this.currentPage = 1;
  }

  onSearch(): void {
    this.applyFilters();
  }

  onStatusChange(): void {
    this.applyFilters();
  }

  viewUserDetails(carOwner: IAdminUser): void {
    this.selectedCarOwner = carOwner;
    this.showUserDetails = true;
    this.isLoadingDetails = true;
    
    // Simulate loading additional details
    setTimeout(() => {
      this.isLoadingDetails = false;
    }, 500);
  }

  closeUserDetails(): void {
    this.showUserDetails = false;
    this.selectedCarOwner = null;
  }

  // Pagination methods
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get pagedCarOwners(): IAdminUser[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredCarOwners.slice(start, start + this.pageSize);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
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
