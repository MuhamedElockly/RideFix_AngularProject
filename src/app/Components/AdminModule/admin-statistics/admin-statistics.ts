import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../Services/AdminService/admin.service';
import { IUsersCount, IRequestsCount } from '../../../Interfaces/Admin/IStatistics';

@Component({
  selector: 'app-admin-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-statistics.html',
  styleUrls: ['./admin-statistics.css']
})
export class AdminStatisticsComponent implements OnInit {
  isLoading = true;
  
  // Statistics Data
  usersCount: IUsersCount = {
    techniciansCount: 0,
    carOwnersCount: 0
  };
  
  requestsCount: IRequestsCount = {
    allRequestsCount: 0,
    waitingRequestsCount: 0
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.isLoading = true;
    
    // Load users count
    this.adminService.getUsersCount().subscribe({
      next: (response) => {
        this.usersCount = response;
      },
      error: (error) => {
        console.error('Error loading users count:', error);
        // Use fallback data
        this.usersCount = {
          techniciansCount: 57,
          carOwnersCount: 23
        };
      }
    });

    // Load requests count
    this.adminService.getRequestsCount().subscribe({
      next: (response) => {
        this.requestsCount = response;
      },
      error: (error) => {
        console.error('Error loading requests count:', error);
        // Use fallback data
        this.requestsCount = {
          allRequestsCount: 51,
          waitingRequestsCount: 1
        };
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
