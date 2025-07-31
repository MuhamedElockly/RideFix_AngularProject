import { IReviewDetails } from './../../../Interfaces/ireview-details';
import { IReview } from './../../../Interfaces/ireview';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ITechnichianDetails } from '../../../Interfaces/ItechnichianDetails';
import { TechnicianService } from '../../../Services/TechnicianService/technician-service';

@Component({
  selector: 'app-profile-view',
  imports: [],
  templateUrl: './profile-view.html',
  styleUrl: './profile-view.css',
  encapsulation: ViewEncapsulation.None, // ✨ الحل هنا
})
export class ProfileView implements OnInit {
  techService = inject(TechnicianService);
  technician: ITechnichianDetails | null = null;
  ngOnInit(): void {
    this.techService.getTechDetails(1).subscribe({
      next: (res) => {
        this.technician = res.body?.data ?? null;
        console.log(this.technician?.categories[0].name);
      },
      error: (err) => {
        console.error('Error fetching technician:', err);
      },
    });
  }
}
