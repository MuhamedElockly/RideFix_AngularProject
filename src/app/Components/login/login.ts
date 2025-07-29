import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/AuthService/auth.service';
import { ILogin } from '../../Interfaces/Account/ILogin';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserStorageService } from '../../Services/UserStorageService/user-storage-service';

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

  constructor(private authService: AuthService, private router: Router,private userStorage:UserStorageService ) {}

  login() {
    this.authService.login(this.loginData).subscribe({
      next: (token) => {
        console.log('Login successful, token:', token);
        localStorage.setItem('token', token);
        let decodedToken: any = jwtDecode(token);
        console.log('Decoded token:', decodedToken.Role);
        console.log('User ID:', decodedToken.Id);
        console.log('User Email:', decodedToken.Email);
        console.log('User Name:', decodedToken.Name);
        console.log(decodedToken)
        // alert('Login successful!');
        if(decodedToken.Role==="CarOwner"){
        this.router.navigate(['/CarOwner/Home']);
        }else if(decodedToken.Role==="Technician") {
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
