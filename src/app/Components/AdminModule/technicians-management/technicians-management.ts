import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../Services/AdminService/admin.service';
import { IAdminUser } from '../../../Interfaces/Admin/IAdminUser';

@Component({
  selector: 'app-technicians-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './technicians-management.html',
  styleUrls: ['./technicians-management.css']
})
export class TechniciansManagementComponent implements OnInit {
  technicians: IAdminUser[] = [];
  filteredTechnicians: IAdminUser[] = [];
  selectedTechnician: IAdminUser | null = null;
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
    this.loadTechnicians();
  }

  loadTechnicians(): void {
    this.isLoading = true;
    this.adminService.getAllUsers().subscribe({
      next: (response) => {
        // Filter only technicians
        this.technicians = response.data.filter((user: IAdminUser) => 
          user.role.toLowerCase().includes('technician') || 
          user.role.toLowerCase().includes('فني')
        );
        this.filteredTechnicians = [...this.technicians];
        this.totalItems = this.technicians.length;
        this.isLoading = false;
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
        tech.phone?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(tech => tech.status === this.selectedStatus);
    }

    this.filteredTechnicians = filtered;
    this.totalItems = filtered.length;
    this.currentPage = 1;
  }

  onSearch(): void {
    this.applyFilters();
  }

  onStatusChange(): void {
    this.applyFilters();
  }

  viewUserDetails(technician: IAdminUser): void {
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

  // Pagination methods
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get pagedTechnicians(): IAdminUser[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredTechnicians.slice(start, start + this.pageSize);
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
