import { IReviewDetails } from '../../../../Interfaces/Reviews/ireview-details';
import { IReview } from '../../../../Interfaces/Reviews/ireview';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ITechnichianDetails } from '../../../../Interfaces/Technichan/ItechnichianDetails';
import { TechnicianService } from '../../../../Services/TechnicianService/technician-service';
import { AuthService } from '../../../../Services/AuthService/auth.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-profile-view',
  imports: [],
  templateUrl: './profile-view.html',
  styleUrl: './profile-view.css',
  encapsulation: ViewEncapsulation.None, // ✨ الحل هنا
})
export class ProfileView implements OnInit {
  url = environment.imgurl;

  techService = inject(TechnicianService);
  technician: ITechnichianDetails | null = null;
  authService = inject(AuthService);
  ngOnInit(): void {
    this.techService.getTechDetails(this.authService.getRoleId()).subscribe({
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
