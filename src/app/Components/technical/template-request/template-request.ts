import {
  Component,
  EventEmitter,
  inject,
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

  constructor(
    private techRequestService: TechrequestService,
    private router: Router,
    private userStorage: UserStorageService
  ) {}

  ngOnInit(): void {
    this.requestWatchDog.startConnection();
    this.requestWatchDog.printConnectionState();
  }

  ngOnDestroy(): void {
    this.requestWatchDog.stopConnection();
  }

  hasAlreadyApplied(requestId: number): boolean {
    return (
      Array.isArray(this.applyrequest) &&
      this.applyrequest.some((app) => app.carOwnerRequestId === requestId)
    );
  }

  navigateToDetails(item: ItechRequect) {
    if (this.showBookingButton) {
      this.router.navigate(['/technician/requestdetailsalltech'], {
        state: { data: item },
      });
    } else {
      this.router.navigate(['/technician/requestdetails'], {
        state: { data: item },
      });
    }
  }

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
          technicianId: item.technicianId,
          requestId: item.requestId,
          requestState: 1,
          pin: password,
        };

        this.techRequestService.putcheck(dto).subscribe({
          next: (res) => {
            if (res.success) {
              this.requestWatchDog.acceptrequest(1);
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
}
