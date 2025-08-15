import { AuthService } from '../../../Services/AuthService/auth.service';
import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TokenService } from '../../../Services/TokenService/tokenservice';
import { NotificationPanelComponent } from '../notification-panel-component/notification-panel-component';
import { FormsModule } from '@angular/forms';
import { NotificationsServices } from '../../../Services/SignalRServices/NotificationService/notifications-services';

@Component({
  selector: 'app-nav-bar-component',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    NotificationPanelComponent,
    FormsModule,
  ],
  templateUrl: './nav-bar-component.html',
  styleUrl: './nav-bar-component.css',
  encapsulation: ViewEncapsulation.None, // ✨ الحل هنا
})
export class NavBarComponent implements OnInit, OnDestroy {
  userRole: string = '';
  isPanelOpen: boolean = false;
  newNotification: boolean = false;
  notificationService = inject(NotificationsServices);
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenservice: TokenService
  ) {
    this.userRole = authService.getRole();
  }

  ngOnInit(): void {
    this.notificationService.startConnection();
    this.notificationService.printConnectionState();
    this.notificationService.addReceiveListener((message: any) => {
      console.log('Received notification:');
      this.newNotification = true; // تحديث حالة الإشعار الجديد
      const notificationSound = new Audio('/assets/sounds/notification.mp3');
      notificationSound.play();
    });
  }
  ngOnDestroy(): void {
    this.notificationService.stopConnection();
    this.notificationService.addReceiveListener(() => {}); // إزالة المستمع
  }

  logout() {
    this.authService.logout();
    // Navigation is now handled by the AuthService
  }
  loginPage() {
    this.router.navigate(['/login']);
  }
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  get userName(): string {
    return this.authService.getUserName();
  }
  togglePanel() {
    this.isPanelOpen = !this.isPanelOpen;
    this.newNotification = false;
  }
  @HostListener('document:click')
  closeOnOutsideClick() {
    this.isPanelOpen = false;
  }
}
