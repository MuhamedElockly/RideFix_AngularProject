import { Component } from '@angular/core';
import { TemplateRequest } from '../template-request/template-request';
import { TechrequestService } from '../../../Services/techRequestService/techrequest-service';
import { ItechRequect } from '../../../Interfaces/itech-requect';

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
    this.techrequest.getAll().subscribe({
      next:b=>{
        this.request = Array.isArray(b) ? b : [b];
        console.log(this.request)
      }
    })
  }

  request:ItechRequect[]=[];
}
