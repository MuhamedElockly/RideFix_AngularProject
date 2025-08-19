import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../Services/AuthService/auth.service';
import { ILogin } from '../../../Interfaces/Account/ILogin';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserStorageService } from '../../../Services/UserStorageService/user-storage-service';
import { TokenService } from '../../../Services/TokenService/tokenservice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  loginData: ILogin = {
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private userStorage: UserStorageService
  ) {}

  login() {
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        const token = res.token;
        console.log('Token received:', token);

        let decodedToken: any = jwtDecode(token);
        this.tokenService.setToken(token);

        //  this.router.navigate(['/admin/dashboard']);
        //           this.userStorage.setUserId(decodedToken.Id);
        //           this.userStorage.setUserName(decodedToken.Name);

        if (decodedToken.Role === 'CarOwner') {
          this.router.navigate(['/CarOwner/Home']);
        } else if (decodedToken.Role === 'Technician') {
          this.router.navigate(['/technician/requests']);
          localStorage.setItem('techid', decodedToken.Id);
          localStorage.getItem('techid');

          this.userStorage.setUserId(decodedToken.Id);
          this.userStorage.setUserName(decodedToken.Name);
        } else if (
          decodedToken.Role === 'Admin' ||
          decodedToken.Role === 'مدير'
        ) {
          this.router.navigate(['/admin/dashboard']);
          this.userStorage.setUserId(decodedToken.Id);
          this.userStorage.setUserName(decodedToken.Name);
        }

        this.userStorage.setUserRole(decodedToken.Role);
      },
      error: (err) => {
        console.error('Login error:', err.status);
        if (err.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
            confirmButtonText: 'حسناً',
          });
        } else if (err.status === 403) {
          Swal.fire({
            icon: 'warning',
            title: 'غير مصرح بالدخول',
            text: 'تم حظر حسابك من قبل الإدارة',
            confirmButtonText: 'حسناً',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'حدث خطأ أثناء تسجيل الدخول، حاول مرة أخرى',
            confirmButtonText: 'حسناً',
          });
        }
      },
    });
  }
}
