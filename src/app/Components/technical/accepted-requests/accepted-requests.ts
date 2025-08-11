import { Component, OnInit } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { TechrequestService } from '../../../Services/techRequestService/techrequest-service';
import { Ihistorytech } from '../../../Interfaces/Technichan/ihistorytech';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accepted-requests',
  templateUrl: './accepted-requests.html',
  styleUrls: ['./accepted-requests.css'],
  imports: [NgClass,DatePipe]
})
export class AcceptedRequestsComponent implements OnInit {
  acceptedRequests: Ihistorytech[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(
    private techRequestService: TechrequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAcceptedRequests();
  }

  loadAcceptedRequests(): void {

    this.loading = true;
    //
    this.error = '';

    this.techRequestService.getacceptrequest().subscribe({
      next: (response) => {
        this.acceptedRequests = Array.isArray(response) ? response : [response];
        this.loading = false;
        console.log('Accepted requests:', this.acceptedRequests);
      },
      error: (error) => {
         if (error.status === 500) {
    // نعامله كأن مفيش بيانات
    this.acceptedRequests = [];
    this.error = ''; // ما نظهرش رسالة الخطأ
  } else {
    // أي خطأ تاني نظهره
    this.error = 'حدث خطأ في تحميل الطلبات المقبولة';
  }
        // console.error('Error loading accepted requests:', error);
        // this.error = 'حدث خطأ في تحميل الطلبات المقبولة';
        this.loading = false;
      }
    });
  }

  navigateToRequestDetails(request: Ihistorytech): void {
    // Navigate to request details page with the request data
    this.router.navigate(['/technician/requestdetails'], {
      state: { data: request }
    });
  }

  getRequestStatusText(requestState: number | null): string {
    switch (requestState) {
      case 1:
        return 'مقبول';
      case 2:
        return 'قيد التنفيذ';
      case 3:
        return 'مكتمل';
      default:
        return 'غير محدد';
    }
  }

  getStatusClass(requestState: number | null): string {
    switch (requestState) {
      case 1:
        return 'status-accepted';
      case 2:
        return 'status-in-progress';
      case 3:
        return 'status-completed';
      default:
        return 'status-unknown';
    }
  }

  formatTimestamp(timestamp: string): string {
    return new Date(timestamp).toLocaleString('ar-EG');
  }

  // Helper methods for filtering
  getPendingRequestsCount(): number {
    return this.acceptedRequests.filter((r: Ihistorytech) => r.requestState === 1).length;
  }

  getInProgressRequestsCount(): number {
    return this.acceptedRequests.filter((r: Ihistorytech) => r.requestState === 2).length;
  }

  getCompletedRequestsCount(): number {
    return this.acceptedRequests.filter((r: Ihistorytech) => r.requestState === 3).length;
  }

  getTotalRequestsCount(): number {
    return this.acceptedRequests.length;
  }
}
