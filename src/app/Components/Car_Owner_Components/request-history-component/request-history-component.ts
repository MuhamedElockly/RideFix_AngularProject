import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { IRequestBrief } from '../../../Interfaces/Requests/irequest-brief';
import { RequestService } from '../../../Services/RequestService/request-service';
import Swal from 'sweetalert2';
import { RequestDetailsComponent } from '../request-details-component/request-details-component';

@Component({
  selector: 'app-request-history-component',
  imports: [RequestDetailsComponent],
  templateUrl: './request-history-component.html',
  styleUrl: './request-history-component.css',
  encapsulation: ViewEncapsulation.None, // ✨ الحل هنا
})
export class RequestHistoryComponent implements OnInit {
  requestService = inject(RequestService);
  requests: IRequestBrief[] | null = null;
  selectedRequestId: Number | null = null;
  showModal = false;

  ngOnInit(): void {
    this.requestService.getRequestsHistory(1).subscribe({
      next: (res) => {
        this.requests = res.data;
      },
      error: (res) => {
        Swal.fire({
          icon: 'error',
          title: 'تافه!!!!!!',
          text: 'لا يوجد تاريخ انت تافه',
        });
      },
    });
  }

  showRequestDetails(id: Number) {
    this.selectedRequestId = id;
    this.showModal = true;
  }

  closeDetailsModal() {
    this.showModal = false;
    this.selectedRequestId = null;
  }
}
