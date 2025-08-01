import { Component } from '@angular/core';
import { TemplateRequest } from '../template-request/template-request';
import { TechrequestService } from '../../../Services/techRequestService/techrequest-service';
import { ItechRequect } from '../../../Interfaces/itech-requect';
import { IRequestApply } from '../../../Interfaces/irequest-apply';
import { Ickeekapply } from '../../../Interfaces/ickeekapply';

@Component({
  selector: 'app-tech-servieces',
  imports: [TemplateRequest],
  templateUrl: './tech-servieces.html',
  styleUrl: './tech-servieces.css'
})
export class TechServieces {
 constructor(private techrequest:TechrequestService,){

  }
  ngOnInit(): void {
    // //get all requests
    // this.techrequest.getAll().subscribe({
    //   next:b=>{
    //     this.request = Array.isArray(b) ? b : [b];
    //     console.log(this.request)
    //   }
    // })

    // techrequest.
    this.techrequest.getapplyrequest().subscribe({
      next:b=>{
        this.applyrequest=Array.isArray(b) ? b : [b];
      }
    })


    this.techrequest.getAll().subscribe({
    next: allRequests => {
      this.request = Array.isArray(allRequests) ? allRequests : [allRequests];

      // استرجاع الطلبات اللي تم الموافقة عليها من قبل التكنيشان
      this.techrequest.getAllbyid().subscribe({
        next: approvedRequests => {
          this.requests = Array.isArray(approvedRequests) ? approvedRequests : [approvedRequests];

          // ✨ تصفية العناصر من this.request اللي موجودة في this.requests بناءً على requestId
          const approvedIds = new Set(this.requests.map(r => r.requestId));
          this.request = this.request.filter(r => !approvedIds.has(r.requestId));

          this.request = this.request.filter((req, index, self) =>
  index === self.findIndex(r => r.requestId === req.requestId)
);

          console.log("بعد التصفية:", this.request);
        }
      });
    }
  });

    //     // get request  by id technician
    //    this.techrequest.getAllbyid().subscribe({
    //   next:b=>{
    //     this.requests = Array.isArray(b) ? b : [b];
    //     console.log(this.request)
    //   }
    // })



  }
applyrequest:Ickeekapply[]=[];
  request:ItechRequect[]=[];
   requests:ItechRequect[]=[];
}
