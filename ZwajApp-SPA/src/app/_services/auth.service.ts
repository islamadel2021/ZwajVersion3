import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();

  baseUrl = 'http://localhost:5082/auth/';

  decodedToken: any;
  constructor(private http: HttpClient) {}

  login(model: any): Observable<any> {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      }),
    );
  }

  register(model: any): Observable<any> {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn(): boolean {
    try {
      const token = localStorage.getItem('token');
      return !this.jwtHelper.isTokenExpired(token);
    } catch {
      return false;
    }
  }
}
