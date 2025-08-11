import { RequestService } from '../../../../Services/RequestService/request-service';
import { Component, inject, OnInit } from '@angular/core';
import { IRequestBrief } from '../../../../Interfaces/Requests/irequest-brief';
import { Router, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { ReviewModelController } from '../review-model-controller/review-model-controller';
import { AuthService } from '../../../../Services/AuthService/auth.service';
@Component({
  selector: 'app-request-alert-component',
  imports: [RouterOutlet, ReviewModelController],
  templateUrl: './request-alert-component.html',
  styleUrl: './request-alert-component.css',
})
export class RequestAlertComponent implements OnInit {
  requestBrief: IRequestBrief | null = null;
  requestService = inject(RequestService);
  routeServie = inject(Router);
  ReviewFlag: boolean = false;
  authService = inject(AuthService);

  ngOnInit(): void {
    this.requestBrief = this.requestService.alertBriefRequest;
  }
  cancelRequest() {
    this.requestService.CancelRequest(this.authService.getRoleId()).subscribe({
      next: (res) => {
        this.routeServie.navigateByUrl('/CarOwner/Home');
        window.location.reload();
      },
      error: (res) => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'لقد حدث خطأ',
        });
      },
    });
  }

  markAsCompleted() {
    this.ReviewFlag = true;
    this.requestService.CompleteRequest().subscribe({
      next: (res) => {
        this.routeServie.navigateByUrl('/CarOwner/Home');
        this.ReviewFlag = true;
      },
      error: (res) => {
        this.ReviewFlag = false;
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'لقد حدث خطأ',
        });
      },
    });
  }
}
