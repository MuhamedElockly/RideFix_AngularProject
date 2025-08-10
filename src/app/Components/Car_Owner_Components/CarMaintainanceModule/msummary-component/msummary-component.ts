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
  ngOnInit(): void {
    this.Mservices.GetMSummary().subscribe({
      next: (res) => {
        this.maintenanceList = res.data;
      },
      error: (ex) => {
        console.error('Error fetching maintenance summary:', ex);
      },
    });
  }
}
