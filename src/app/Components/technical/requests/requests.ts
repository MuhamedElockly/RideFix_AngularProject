import { Component, OnInit } from '@angular/core';
import { TechrequestService } from '../../../Services/techRequestService/techrequest-service';
import { ItechRequect } from '../../../Interfaces/itech-requect';
import { TemplateRequest } from '../template-request/template-request';

@Component({
  selector: 'app-requests',
  imports: [TemplateRequest],
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

}
