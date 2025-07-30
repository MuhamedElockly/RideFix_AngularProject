import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItechRequect } from '../../../Interfaces/itech-requect';

  import Swal from 'sweetalert2';
import { TechrequestService } from '../../../Services/techRequestService/techrequest-service';
import { IcheckRequect } from '../../../Interfaces/icheck-requect';
import { Router } from '@angular/router';


@Component({
  selector: 'app-template-request',
  imports: [],
  templateUrl: './template-request.html',
  styleUrls: ['./template-request.css']
})
export class TemplateRequest {

@Input() request!:ItechRequect[];
@Input() showBookingButton: boolean = false;





constructor(private techRequestService:TechrequestService ,private router:Router ){}

confirmApprovalWithPassword(item: ItechRequect) {
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
      autocorrect: 'off'
    },
    preConfirm: (password) => {
      if (!password) {
        Swal.showValidationMessage('كلمة المرور مطلوبة');
      } else {
        return password;
      }
    }
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      const password = result.value;

      const dto:IcheckRequect = {
        isCompleted:true,
technicianId:item.technicianId,
requestId:item.requestId,
newStatus:1,
pin:password,
      };
console.log("Data Sent to API:", dto);

      this.techRequestService.putcheck(dto).subscribe({
        next: (res) => {
          if (res.success) {
            Swal.fire({
              icon: 'success',
              title: 'تمت الموافقة',
              // text: res.message
            }).then(() => {
      // الانتقال إلى مكون آخر بعد الضغط على "موافق"
      this.router.navigate(['/techchat']);
    });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'خطأ',
              text: res.message
            });
          }
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'حدث خطأ',
            text: 'كلمة المرور غير صحيحة'

          });
          // console.error(err);
        }
      });
    }
  });
}



}
