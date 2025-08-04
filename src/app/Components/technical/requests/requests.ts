import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TechrequestService } from '../../../Services/techRequestService/techrequest-service';
import { ItechRequect } from '../../../Interfaces/Technichan/itech-requect';
import { TemplateRequest } from '../template-request/template-request';
import { Ihistorytech } from '../../../Interfaces/Technichan/ihistorytech';
import { RequestWatchDogHub } from '../../../Services/SignalRServices/RequestWatchDogHub/request-watch-dog-hub';

@Component({
  selector: 'app-requests',
  imports: [TemplateRequest],
  templateUrl: './requests.html',
  styleUrl: './requests.css',
})
export class Requests implements OnInit {
  requestWatchDog = inject(RequestWatchDogHub);
  constructor(private techrequest: TechrequestService) {}
  ngOnInit(): void {
    this.techrequest.getAllbyid().subscribe({
      next: (b) => {
        this.request = Array.isArray(b) ? b : [b];
        console.log(this.request);
      },
    });

    this.techrequest.getacceptrequest().subscribe({
      next: (b) => {
        this.Acecctrequest = Array.isArray(b) ? b : [b];
        // console.log(this.request)
      },
    });
  }

  Acecctrequest: Ihistorytech[] = [];
  request: ItechRequect[] = [];

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
