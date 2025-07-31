import { Component, OnInit } from '@angular/core';
import { TechrequestService } from '../../../Services/techRequestService/techrequest-service';
import { ItechRequect } from '../../../Interfaces/itech-requect';
import { Ihistorytech } from '../../../Interfaces/ihistorytech';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-historytech',
  imports: [DatePipe],
  templateUrl: './historytech.html',
  styleUrl: './historytech.css'
})
export class Historytech implements OnInit{
  requestcomplete:Ihistorytech[]=[]
  constructor(private techrequest:TechrequestService){}
 ngOnInit(): void {
     this.techrequest.gethistory().subscribe({
      next:b=>{
        this.requestcomplete=b;
        console.log(this.requestcomplete);

      }
     })
 }
}
