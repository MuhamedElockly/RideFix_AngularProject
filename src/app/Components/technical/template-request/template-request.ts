import {
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ItechRequect } from '../../../Interfaces/itech-requect';

import Swal from 'sweetalert2';
import { TechrequestService } from '../../../Services/techRequestService/techrequest-service';
import { IcheckRequect } from '../../../Interfaces/icheck-requect';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { IRequestApply } from '../../../Interfaces/irequest-apply';
import { UserStorageService } from '../../../Services/UserStorageService/user-storage-service';
import { Ickeekapply } from '../../../Interfaces/ickeekapply';
import { Ihistorytech } from '../../../Interfaces/ihistorytech';
import { RequestWatchDogHub } from '../../../Services/SignalRServices/RequestWatchDogHub/request-watch-dog-hub';

@Component({
  selector: 'app-template-request',
  imports: [RouterLink, RouterModule],
  templateUrl: './template-request.html',
  styleUrls: ['./template-request.css'],
})
export class TemplateRequest implements OnInit, OnDestroy {
  @Input() request!: ItechRequect[];
  @Input() showBookingButton: boolean = false;
  @Input() applyrequest: Ickeekapply[] = [];
  @Input() Acecctrequest: Ihistorytech[] = [];
  requestWatchDog = inject(RequestWatchDogHub);

  ngOnInit(): void {
    this.requestWatchDog.startConnection();
    this.requestWatchDog.printConnectionState();
  }
  ngOnDestroy(): void {
    this.requestWatchDog.stopConnection();
  }
  hasAlreadyApplied(requestId: number): boolean {
    console.log('Checking if already applied for request ID:');
    console.log(requestId);

    return (
      Array.isArray(this.applyrequest) &&
      this.applyrequest.some((app) => app.carOwnerRequestId === requestId)
    );
  }

  constructor(
    private techRequestService: TechrequestService,
    private router: Router,
    private userStorage: UserStorageService
  ) {}

  confirmApprovalWithPassword(item: ItechRequect) {
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
      if (result.isConfirmed && result.value) {
        const password = result.value;

        const dto: IcheckRequect = {
          // isCompleted:true,
          technicianId: item.technicianId,
          requestId: item.requestId,
          requestState: 1,
          pin: password,
        };
        console.log('Data Sent to API:', dto);

        this.techRequestService.putcheck(dto).subscribe({
          next: (res) => {
            if (res.success) {
              this.requestWatchDog.acceptrequest(1);
              Swal.fire({
                icon: 'success',
                title: 'تمت الموافقة',
                // text: res.message
              }).then(() => {
                // الانتقال إلى مكون آخر بعد الضغط على "موافق"
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

  confirmApprovalWithPasswordApply(item: ItechRequect) {
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
}
