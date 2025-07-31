import { Component, OnInit } from '@angular/core';
import { TemplateRequestdetails } from '../template-requestdetails/template-requestdetails';
import { ItechRequect } from '../../../Interfaces/itech-requect';

@Component({
  selector: 'app-request-detailsalltech',
  imports: [TemplateRequestdetails],
  templateUrl: './request-detailsalltech.html',
  styleUrl: './request-detailsalltech.css'
})
export class RequestDetailsalltech implements OnInit {
 item: ItechRequect|null=null ;
  // constructor(private router:Router){}
  ngOnInit(): void {
       this.item = history.state['data'] ?? null;
    console.log('Received item:', this.item);
}
}
