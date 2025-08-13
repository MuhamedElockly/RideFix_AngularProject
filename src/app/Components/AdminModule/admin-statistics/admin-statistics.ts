import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../Services/AdminService/admin.service';

@Component({
  selector: 'app-admin-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-statistics.html',
  styleUrls: ['./admin-statistics.css']
})
export class AdminStatisticsComponent implements OnInit {
  isLoading = true;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    // Simulate loading
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}
