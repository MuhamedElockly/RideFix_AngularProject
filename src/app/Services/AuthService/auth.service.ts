import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin } from '../../Interfaces/Account/ILogin';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { TokenService } from '../TokenService/tokenservice';
// import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5038/api/account';

  constructor(private http: HttpClient, private tokenservice: TokenService) {}

  login(dto: ILogin): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, dto, {
      responseType: 'json',
    });
  }

  logout() {
    this.tokenservice.clearToken();
    // localStorage.removeItem('token');
  }
  isLoggedIn(): boolean {
    // return !!localStorage.getItem('token');
    return !!this.tokenservice.getToken();
  }
  registerStep1(data: any) {
    const cleanedData = {
      ...data,
      startWorking: data.startWorking?.trim() ? data.startWorking : null,
      endWorking: data.endWorking?.trim() ? data.endWorking : null,
    };
    return this.http.post(`${this.baseUrl}/register-step1`, cleanedData);
  }

  registerStep2(formData: FormData) {
    return this.http.post(`${this.baseUrl}/register-step2`, formData);
  }
  checkEmailExists(email: string) {
    return this.http.get<boolean>(`${this.baseUrl}/check-email?email=${email}`);
  }
  getUserName(): string {
    const token = this.tokenservice.getToken();
    // console.log('Token in getUserName:', token);
    if (!token) return '';

    let decodedToken: any = jwtDecode(token);

    // console.log('User Name:', decodedToken.Name);

    const payload = JSON.parse(atob(token.split('.')[1]));
    const name = decodedToken.Name.split(' ')[0]; // Get the first name
    // console.log('Decoded Name:', name);
    return name || '';
  }

  getUserId(): string {
    const token = this.tokenservice.getToken();
    if (!token) return '';
    let decodedToken: any = jwtDecode(token);
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userid = decodedToken.userId.split(' ')[0];
    console.log('Decoded Name:', userid);
    return userid || '';
  }
}
