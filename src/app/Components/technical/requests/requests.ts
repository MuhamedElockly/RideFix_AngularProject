import { Component, OnInit, ViewChild } from '@angular/core';
import { TechrequestService } from '../../../Services/techRequestService/techrequest-service';
import { ItechRequect } from '../../../Interfaces/itech-requect';
import { TemplateRequest } from '../template-request/template-request';
import { TemplateSweet } from '../template-sweet/template-sweet';

@Component({
  selector: 'app-requests',
  imports: [TemplateRequest,TemplateSweet],
  templateUrl: './requests.html',
  styleUrl: './requests.css'
})
export class Requests implements OnInit {
  constructor(private techrequest:TechrequestService,){

  }
  ngOnInit(): void {
    this.techrequest.getAll().subscribe({
      next:b=>{
        this.request = Array.isArray(b) ? b : [b];
        console.log(this.request)
      }
    })
  }

  request:ItechRequect[]=[];

  //  @ViewChild(TemplateSweet) alertModal!: TemplateSweet;

  // alertTitle = '';
  // alertMessage = '';
  // selectedRequest: any;

  // openAlert(item: any) {
  //   this.selectedRequest = item;
  //   this.alertTitle = 'تأكيد القبول';
  //   this.alertMessage = `هل أنت متأكد من قبول الطلب الخاص بـ ${item.carOwnerId}؟`;
  //   this.alertModal.show();
  // }

  // handleConfirm(item: any) {
  //   // هنا تكتبي اللي يحصل بعد الضغط على "تأكيد"
  //   console.log('تم تأكيد الطلب:', item);
  //   // مثلاً تروحي تعملِ API call لقبول الطلب
  // }
////*** */
// showSuccess = false;
//   handleApprove() {
//     this.showSuccess = true;
//     setTimeout(() => {
//       this.showSuccess = false;
//     }, 2000); // تختفي بعد ثانيتين
//   }


}
