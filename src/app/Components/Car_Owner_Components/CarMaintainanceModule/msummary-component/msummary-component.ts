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
  Mservices = inject(MaintainanceServices);

  // Pagination state
  currentPage = 1;
  pageSize = 3;

  ngOnInit(): void {
    this.Mservices.GetMSummary().subscribe({
      next: (res) => {
        this.maintenanceList = res.data ?? [];
        this.currentPage = 1; // reset
      },
      error: (ex) => console.error('Error fetching maintenance summary:', ex),
    });
  }

  // derived
  get totalItems(): number {
    return this.maintenanceList.length;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalItems / this.pageSize));
  }

  get pagedList(): MaintenanceSummaryItem[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.maintenanceList.slice(start, start + this.pageSize);
  }

  get pages(): number[] {
    if (this.totalPages <= 7) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
    const windowSize = 5;
    let start = Math.max(1, this.currentPage - Math.floor(windowSize / 2));
    let end = Math.min(this.totalPages, start + windowSize - 1);
    if (end - start + 1 < windowSize) start = Math.max(1, end - windowSize + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  setPage(p: number) {
    if (p < 1 || p > this.totalPages) return;
    this.currentPage = p;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }
}
