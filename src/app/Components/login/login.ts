import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/AuthService/auth.service';
import { ILogin } from '../../Interfaces/Account/ILogin';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserStorageService } from '../../Services/UserStorageService/user-storage-service';
import { TokenService } from '../../Services/TokenService/tokenservice';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
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
        console.log('Login successful, token:', token);

        this.tokenService.setToken(token);
        if (decodedToken.Role === 'CarOwner') {
          this.router.navigate(['/CarOwner/Home']);
        } else if (decodedToken.Role === 'Technician') {
          this.router.navigate(['/technician/requests']);
          this.userStorage.setUserId(decodedToken.Id);
          this.userStorage.setUserName(decodedToken.Name);
          //  this.userStorage.setUserimg(decodedToken.Id);
        }
        this.userStorage.setUserRole(decodedToken.Role);
      },
      error: () => {
        alert('Login failed.');
      },
    });
  }
}
