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
}
