import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ItechRequect } from '../../../Interfaces/itech-requect';
import { TemplateRequest } from '../template-request/template-request';
import { TemplateRequestdetails } from '../template-requestdetails/template-requestdetails';
import { TechrequestService } from '../../../Services/techRequestService/techrequest-service';
import { Ihistorytech } from '../../../Interfaces/ihistorytech';

@Component({
  selector: 'app-request-details',
  imports: [RouterLink,RouterModule,TemplateRequestdetails],
  templateUrl: './request-details.html',
  styleUrl: './request-details.css'
})
export class RequestDetails implements OnInit {
 item: ItechRequect|null=null ;
  constructor(private router:Router,private techrequest:TechrequestService){}
  ngOnInit(): void {
       this.item = history.state['data'] ?? null;
    console.log('Received item:', this.item);

     this.techrequest.getacceptrequest().subscribe({
      next:b=>{
        this.Acecctrequest = Array.isArray(b) ? b : [b];
        console.log(this.Acecctrequest);
      }
     })

  }
  Acecctrequest:Ihistorytech[]=[];



}
