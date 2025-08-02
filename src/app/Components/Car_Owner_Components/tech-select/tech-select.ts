import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
// import { TechnicianService } from '../../../Services/TechnicianService/technician-service';
import { ITechnician } from '../../../Interfaces/Technichan/itechnician';
import { TechnicianService } from '../../../Services/TechnicianService/technician-service';
import { RequestService } from '../../../Services/RequestService/request-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tech-select',
  imports: [],
  templateUrl: './tech-select.html',
  styleUrl: './tech-select.css',
  encapsulation: ViewEncapsulation.None, // ✨ الحل هنا
})
export class TechSelect implements OnInit {
  routeService = inject(Router);
  techService = inject(TechnicianService);
  requestService = inject(RequestService);
  pinvalue: Number = 0;

  filteredTech: ITechnician[] = [];
  SelectedTechs: number[] = [];
  SelectedCount: number = 0;

  ngOnInit(): void {
    const preRequest = this.requestService.SetRealRequestFromLocal();

    if (preRequest) {
      this.requestService.CreatePreRequest(preRequest).subscribe({
        next: (res) => {
          this.filteredTech = res.body?.data!;
        },
        error: (err) => {
          console.error('Error loading filtered techs', err);
        },
      });
    }
  }

  onCheckboxChange(event: Event, selectedId: number) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.SelectedTechs.push(Number(selectedId));
    } else {
      this.SelectedTechs = this.SelectedTechs.filter((id) => id !== selectedId);
    }
    this.SelectedCount = this.SelectedTechs.length;
  }

  // submitSelection() {
  //   this.requestService.CreateRequest(this.SelectedTechs).subscribe({
  //     next: (res) => {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'تم بنجاح',
  //         text: 'تم إرسال الطلب بنجاح',
  //         confirmButtonText: 'حسناً',
  //       }).then(() => {
  //         this.routeService.navigateByUrl('CarOwner/Waiting');
  //       });
  //     },
  //     error: (err) => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'خطأ',
  //         text: 'حدث خطأ أثناء إرسال الطلب، حاول مرة أخرى',
  //         confirmButtonText: 'حسناً',
  //       });
  //     },
  //   });
  // }

  public viewProfile(Id: number) {
    this.techService.profileViewId = Id;
    this.routeService.navigateByUrl('/CarOwner/TechViewDetails');
  }

  onSubmit() {
    Swal.fire({
      title: 'أدخل رمز PIN',
      input: 'text',
      inputLabel: 'الرمز السري المكوّن من 4 أرقام',
      inputPlaceholder: '••••',
      inputAttributes: {
        maxlength: '4',
        pattern: '[0-9]*',
        autocapitalize: 'off',
        autocorrect: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'تأكيد',
      cancelButtonText: 'إلغاء',
      inputValidator: (value) => {
        if (!value) {
          return 'من فضلك أدخل رمز PIN';
        } else if (!/^\d{2}$/.test(value)) {
          return 'الرمز يجب أن يكون 4 أرقام فقط';
        }
        return null;
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.pinvalue = result.value;
        this.requestService
          .CreateRequest(this.SelectedTechs, this.pinvalue)
          .subscribe({
            next: (res) => {
              Swal.fire({
                icon: 'success',
                title: 'تم بنجاح',
                text: 'تم إرسال الطلب بنجاح',
                confirmButtonText: 'حسناً',
              }).then(() => {
                localStorage.removeItem('realRequest');
                this.routeService.navigateByUrl('CarOwner/Waiting');
              });
            },
            error: (err) => {
              if (err.status == 400) {
                Swal.fire({
                  icon: 'error',
                  title: 'خطأ',
                  text: 'رمز PIN غير صحيح ❌',
                });
              } else if (err.status == 409) {
                Swal.fire({
                  icon: 'error',
                  title: 'خطأ',
                  text: 'يوجد طلب قيد التنفيذ❌',
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'خطأ',
                  text: 'حدث خطأ أثناء إرسال الطلب، حاول مرة أخرى',
                  confirmButtonText: 'حسناً',
                });
              }
            },
          });
      }
    });
  }
}
