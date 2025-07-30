import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin } from '../../Interfaces/Account/ILogin';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5038/api/account';

  constructor(private http: HttpClient) {}

  login(dto: ILogin): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/login`, dto, {
      responseType: 'text' as 'json',
    });
  }
  logout() {
    localStorage.removeItem('token');
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
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
}
