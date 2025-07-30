import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/AuthService/auth.service';
import { ILogin } from '../../Interfaces/Account/ILogin';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
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
    private tokenService: TokenService
  ) {}

  login() {
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        const token = res.token;
        console.log('Login successful, token:', token);
        this.tokenService.setToken(token);
        // let decodedToken: any = jwtDecode(token);
        // console.log('Decoded token:', decodedToken.Role);
        // console.log('User ID:', decodedToken.Id);
        // console.log('User Email:', decodedToken.Email);
        // console.log('User Name:', decodedToken.Name);

        setTimeout(() => {
          this.router.navigate(['/CarOwner/Home']);
        }, 2000);
      },
      error: () => {
        alert('Login failed.');
      },
    });
  }
}
