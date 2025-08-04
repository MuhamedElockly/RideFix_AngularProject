import { Component } from '@angular/core';
import { TemplateRequest } from '../template-request/template-request';
import { TechrequestService } from '../../../Services/techRequestService/techrequest-service';
import { ItechRequect } from '../../../Interfaces/Technichan/itech-requect';
import { IRequestApply } from '../../../Interfaces/Requests/irequest-apply';
import { Ickeekapply } from '../../../Interfaces/ickeekapply';

@Component({
  selector: 'app-tech-servieces',
  imports: [TemplateRequest],
  templateUrl: './tech-servieces.html',
  styleUrl: './tech-servieces.css',
})
export class TechServieces {
  constructor(private techrequest: TechrequestService) {}
  ngOnInit(): void {
    //get all requests
    this.techrequest.getAll().subscribe({
      next: (b) => {
        this.request = Array.isArray(b) ? b : [b];
        console.log(this.request);
      },
    });

    // techrequest.
    this.techrequest.getapplyrequest().subscribe({
      next: (b) => {
        this.applyrequest = Array.isArray(b) ? b : [b];
      },
    });
  }
  applyrequest: Ickeekapply[] = [];
  request: ItechRequect[] = [];
  requests: ItechRequect[] = [];
}
