import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserStorageService } from '../../../Services/UserStorageService/user-storage-service';
import { Technincalservice } from '../../../Services/Technincalservice/technincalservice';
// import { ITechnician } from '../../../Interfaces/itechnician';
import { Itechiciandetails } from '../../../Interfaces/Technichan/itechiciandetails';
import { AuthService } from '../../../Services/AuthService/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  menuVisible = false;
  Name: string | null = null;
  tech: Itechiciandetails | null = null;

  constructor(
    private router: Router,
    private usersorage: UserStorageService,
    private technincalserviec: Technincalservice,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.Name=this.usersorage.getUserName();
    // this.tech=this.technincalserviec.gettechnician();
    this.technincalserviec.gettechnician().subscribe({
      next: (b) => {
        this.tech = b;
        console.log('sidbar', this.tech);
      },
    });
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  isRequestsOrDetails(): boolean {
    const url = this.router.url;
    return (
      url === '/technician/requests' || url === '/technician/requestdetails'
    );
  }

  isRequestsOrDetailsall(): boolean {
    const url = this.router.url;
    return (
      url === '/technician/techservieces' ||
      url === '/technician/requestdetailsalltech'
    );
  }

  logout() {
    this.authService.logout();
    // Navigation is now handled by the AuthService
  }
}
