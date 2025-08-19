import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { IRequestBrief } from '../../../../Interfaces/Requests/irequest-brief';
import { RequestService } from '../../../../Services/RequestService/request-service';
import Swal from 'sweetalert2';
import { RequestDetailsComponent } from '../request-details-component/request-details-component';
import { AuthService } from '../../../../Services/AuthService/auth.service';
import { ReportService } from '../../../../Services/ReportsService/report-service';

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
  authService = inject(AuthService);
  reportingService = inject(ReportService);
  ngOnInit(): void {
    this.requestService
      .getRequestsHistory(this.authService.getRoleId())
      .subscribe({
        next: (res) => {
          this.requests = res.data;
          console.log(this.requests);
        },
        error: (res) => {
          Swal.fire({
            icon: 'error',
            title: 'فارغ',
            text: 'سجل طلباتك فارغ',
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
  reportRequest(reqId: Number) {
    Swal.fire({
      title: 'إبلاغ عن الطلب',
      html: `
      <textarea id="reportDesc" class="swal2-textarea" placeholder="اكتب وصف البلاغ والمشكلة..." rows="4"></textarea>
    `,
      inputAttributes: {
        'aria-label': 'اكتب وصف البلاغ هنا',
      },
      showCancelButton: true,
      confirmButtonText: 'إرسال البلاغ',
      cancelButtonText: 'إلغاء',
      preConfirm: () => {
        const desc = (
          document.getElementById('reportDesc') as HTMLTextAreaElement
        ).value.trim();
        if (!desc) {
          Swal.showValidationMessage('الرجاء كتابة وصف البلاغ');
        }
        return desc;
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.reportingService.createReport(result.value, reqId).subscribe({
          next: () => {
            Swal.fire('تم الإبلاغ!', 'تم إرسال البلاغ بنجاح.', 'success');
          },
          error: () => {
            Swal.fire('خطأ!', 'حدث خطأ أثناء إرسال البلاغ.', 'error');
          },
        });
      }
    });
  }
}
