import { Component, OnInit } from '@angular/core';
import { TechrequestService } from '../../../Services/techRequestService/techrequest-service';
import { ItechRequect } from '../../../Interfaces/Technichan/itech-requect';
import { Ihistorytech } from '../../../Interfaces/Technichan/ihistorytech';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-historytech',
  imports: [DatePipe],
  templateUrl: './historytech.html',
  styleUrl: './historytech.css',
})
export class Historytech implements OnInit {
  requestcomplete: Ihistorytech[] = [];
   isLoading: boolean = true;
  constructor(private techrequest: TechrequestService) {}
  ngOnInit(): void {
    this.techrequest.gethistory().subscribe({
      next: (b) => {
        this.requestcomplete = b;
        console.log(this.requestcomplete);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false; // حتى لا يعلق على التحميل في حال الخطأ
      },
    });
  }
}
