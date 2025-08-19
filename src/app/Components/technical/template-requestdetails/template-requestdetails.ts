import { AuthService } from './../../../Services/AuthService/auth.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ItechRequect } from '../../../Interfaces/Technichan/itech-requect';
import { Router } from '@angular/router';
import { TechrequestService } from '../../../Services/techRequestService/techrequest-service';
import Swal from 'sweetalert2';
import { IcheckRequect } from '../../../Interfaces/Requests/icheck-requect';
import { IRequestApply } from '../../../Interfaces/Requests/irequest-apply';
import { UserStorageService } from '../../../Services/UserStorageService/user-storage-service';
import { Ihistorytech } from '../../../Interfaces/Technichan/ihistorytech';
import { RequestWatchDogHub } from '../../../Services/SignalRServices/RequestWatchDogHub/request-watch-dog-hub';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template-requestdetails',
  templateUrl: './template-requestdetails.html',
  styleUrls: ['./template-requestdetails.css'],
  imports: [CommonModule],
})
export class TemplateRequestdetails implements OnInit {
  @Input() item: ItechRequect | null = null;
  @Input() showBookingButton: boolean = false;
  @Input() Acecctrequest: Ihistorytech[] = [];

  // AuthService = inject(AuthService)
  requestWatchDog = inject(RequestWatchDogHub);
  url: string = '';

  constructor(
    private router: Router,
    private techRequestService: TechrequestService,
    private userStorage: UserStorageService
  ) {}

  ngOnInit(): void {
    this.url = this.router.url;
  }

  confirmApprovalWithPassword(item: ItechRequect | null) {
    if (!item) return;

    if (this.Acecctrequest.length >= 2) {
      Swal.fire({
        icon: 'warning',
        title: 'لا يمكن الموافقة',
        text: 'لقد قمت بالفعل بالموافقة على طلبين، لا يمكنك الموافقة على طلبات إضافية.',
        confirmButtonText: 'حسناً',
      });
      return;
    }

    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'من فضلك أدخل رمز PIN',
      input: 'password',
      inputLabel: 'كلمة المرور',
      inputPlaceholder: 'اكتب كلمة المرور هنا',
      showCancelButton: true,
      confirmButtonText: 'تأكيد',
      cancelButtonText: 'إلغاء',
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off',
      },
      preConfirm: (password) => {
        if (!password) {
          Swal.showValidationMessage('كلمة المرور مطلوبة');
        } else {
          return password;
        }
      },
    }).then((result) => {
      if (result.isConfirmed && result.value && item) {
        const password = result.value;

        const checkDto: IcheckRequect = {
          technicianId: item.technicianId,
          requestId: item.requestId,
          requestState: 1,
          pin: password,
        };

        this.techRequestService.putcheck(checkDto).subscribe({
          next: (res) => {
            if (res.success) {
              this.requestWatchDog.acceptrequest(item.carOwnerId);

              Swal.fire({
                icon: 'success',
                title: 'تمت الموافقة',
              }).then(() => {
                this.router.navigate(['/technician/accepted-requests']);
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: res.message,
              });
            }
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'حدث خطأ',
              text: 'كلمة المرور غير صحيحة',
            });
          },
        });

        const userId = localStorage.getItem('techid');
        const applyDto: IRequestApply = {
          requestId: item.requestId,
          userId: userId !== null ? Number(userId) : 0,
          timeStamp: new Date().toISOString(),
          pin: Number(password),
        };

        this.techRequestService.putapply(applyDto).subscribe({
          next: (res) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                title: 'تمت الموافقة',
              }).then(() => {
                this.router.navigate(['/technician/techservieces']);
              });
            }
          },
        });
      }
    });
  }

  confirmApprovalWithPasswordApply(item: ItechRequect | null) {
    if (!item) return;

    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'من فضلك أدخل رمز PIN',
      input: 'password',
      inputLabel: 'كلمة المرور',
      inputPlaceholder: 'اكتب كلمة المرور هنا',
      showCancelButton: true,
      confirmButtonText: 'تأكيد',
      cancelButtonText: 'إلغاء',
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off',
      },
      preConfirm: (password) => {
        if (!password) {
          Swal.showValidationMessage('كلمة المرور مطلوبة');
        } else {
          return password;
        }
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const password = result.value;
        const userId = localStorage.getItem('techid');

        const dto: IRequestApply = {
          requestId: item.requestId,
          userId: userId !== null ? Number(userId) : 0,
          timeStamp: new Date().toISOString(),
          pin: Number(password),
        };

        this.techRequestService.putapply(dto).subscribe({
          next: (res) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                title: 'تمت الموافقة',
              }).then(() => {
                this.router.navigate(['/technician/techservieces']);
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: res.message,
              });
            }
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'حدث خطأ',
              text: 'كلمة المرور غير صحيحة',
            });
          },
        });
      }
    });
  }

  rejectApprovalWithPassword(item: ItechRequect | null) {
    if (!item) return;

    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'يرجى إدخال كلمة المرور لتأكيد الرفض',
      input: 'password',
      inputLabel: 'كلمة المرور',
      inputPlaceholder: 'اكتب كلمة المرور هنا',
      showCancelButton: true,
      confirmButtonText: 'تأكيد',
      cancelButtonText: 'إلغاء',
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off',
      },
      preConfirm: (password) => {
        if (!password) {
          Swal.showValidationMessage('كلمة المرور مطلوبة');
        } else {
          return password;
        }
      },
    }).then((result) => {
      if (result.isConfirmed && result.value && item) {
        const password = result.value;

        const dto: IcheckRequect = {
          technicianId: item.technicianId,
          requestId: item.requestId,
          requestState: 2,
          pin: password,
        };

        this.techRequestService.putcheck(dto).subscribe({
          next: (res) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                title: 'تم الرفض',
              }).then(() => {
                this.router.navigate(['/technician/requests']);
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: res.message,
              });
            }
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'حدث خطأ',
              text: 'كلمة المرور غير صحيحة',
            });
          },
        });
      }
    });
  }
}
