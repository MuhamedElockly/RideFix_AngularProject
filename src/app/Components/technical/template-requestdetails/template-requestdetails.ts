import {
  Component,
  inject,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ItechRequect } from '../../../Interfaces/itech-requect';
import { Router } from '@angular/router';
import { TechrequestService } from '../../../Services/techRequestService/techrequest-service';
import Swal from 'sweetalert2';
import { IcheckRequect } from '../../../Interfaces/icheck-requect';
import { IRequestApply } from '../../../Interfaces/irequest-apply';
import { UserStorageService } from '../../../Services/UserStorageService/user-storage-service';
import { Ihistorytech } from '../../../Interfaces/ihistorytech';
import { RequestWatchDogHub } from '../../../Services/SignalRServices/RequestWatchDogHub/request-watch-dog-hub';

@Component({
  selector: 'app-template-requestdetails',
  imports: [],
  templateUrl: './template-requestdetails.html',
  styleUrl: './template-requestdetails.css',
})
export class TemplateRequestdetails implements OnInit {
  @Input() item: ItechRequect | null = null;
  @Input() showBookingButton: boolean = false;
  @Input() Acecctrequest: Ihistorytech[] = [];
  requestWatchDog = inject(RequestWatchDogHub);

  constructor(
    private router: Router,
    private techRequestService: TechrequestService,
    private userStorage: UserStorageService
  ) {}
  url: string = '';
  ngOnInit(): void {
    this.url = this.router.url;
  }

  confirmApprovalWithPassword(item: ItechRequect | null) {
    console.log(item);
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
    // return;

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

        const dto: IcheckRequect = {
          // isCompleted: true,
          technicianId: item.technicianId,
          requestId: item.requestId,
          requestState: 1,
          pin: password,
        };

        console.log('Data Sent to API:', dto);

        this.techRequestService.putcheck(dto).subscribe({
          next: (res) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                title: 'تمت الموافقة',
              }).then(() => {
                this.router.navigate(['/technician/techchat']);
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

  confirmApprovalWithPasswordApply(item: ItechRequect | null) {
    console.log(item);
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
        const userId = this.userStorage.getUserId();

        const dto: IRequestApply = {
          requestId: item.requestId,
          userId: userId !== null ? Number(userId) : 0,
          timeStamp: new Date().toISOString(),
          pin: Number(password),
        };
        console.log('Data Sent to API:', dto);

        this.techRequestService.putapply(dto).subscribe({
          next: (res) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                title: 'تمت الموافقة',
                // text: res.message
              }).then(() => {
                // الانتقال إلى مكون آخر بعد الضغط على "موافق"
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
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'حدث خطأ',
              text: 'كلمة المرور غير صحيحة',
            });
            // console.error(err);
          },
        });
      }
    });
  }

  rejectApprovalWithPassword(item: ItechRequect | null) {
    console.log(item);
    if (!item) return;

    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'يرجى إدخال كلمة المرور لتأكيد الموافقة',
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
          // isCompleted: true,
          technicianId: item.technicianId,
          requestId: item.requestId,
          requestState: 2,
          pin: password,
        };

        console.log('Data Sent to API:', dto);

        this.techRequestService.putcheck(dto).subscribe({
          next: (res) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                title: 'تمت الرفض',
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
