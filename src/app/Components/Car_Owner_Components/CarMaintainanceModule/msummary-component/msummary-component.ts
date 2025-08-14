import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaintenanceSummaryItem } from '../../../../Interfaces/MaintainanceInterfaces/maintenance-summary-item';
import { MaintainanceServices } from '../../../../Services/MaintainanceService/maintainance-services';

@Component({
  selector: 'app-msummary-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './msummary-component.html',
  styleUrl: './msummary-component.css',
})
export class MSummaryComponent implements OnInit {
  maintenanceList: MaintenanceSummaryItem[] = [];
  pagedList: MaintenanceSummaryItem[] = [];
  pages: number[] = [];

  currentPage = 1;
  pageSize = 3;
  totalItems = 0;
  totalPages = 0;

  Mservices = inject(MaintainanceServices);

  ngOnInit(): void {
    this.Mservices.GetMSummary().subscribe({
      next: (res) => {
        this.maintenanceList = (res.data ?? []).map((item) => ({
          maintenanceTypeName: item.maintenanceTypeName || '',
          status: item.status ?? 0,
          lastMaintenanceDate: item.lastMaintenanceDate || null,
          nextExpectedMaintenance: item.nextExpectedMaintenance || null,
        }));

        this.totalItems = this.maintenanceList.length;
        this.totalPages = Math.max(
          1,
          Math.ceil(this.totalItems / this.pageSize)
        );
        this.updatePage();
      },
      error: (err) => console.error('Error fetching maintenance summary:', err),
    });
  }

  updatePage() {
    // Recalculate totalPages in case data changed
    this.totalPages = Math.max(1, Math.ceil(this.totalItems / this.pageSize));

    // Fix: if current page is out of range after data change
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    const start = (this.currentPage - 1) * this.pageSize;
    this.pagedList = this.maintenanceList.slice(start, start + this.pageSize);

    // Generate pages array
    if (this.totalPages <= 7) {
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    } else {
      const windowSize = 5;
      let startPage = Math.max(
        1,
        this.currentPage - Math.floor(windowSize / 2)
      );
      let endPage = Math.min(this.totalPages, startPage + windowSize - 1);
      if (endPage - startPage + 1 < windowSize) {
        startPage = Math.max(1, endPage - windowSize + 1);
      }
      this.pages = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      );
    }
  }

  setPage(p: number) {
    if (p < 1 || p > this.totalPages) return;
    this.currentPage = p;
    this.updatePage();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }
}
