import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private cookies: CookieService) {}

  login(user: any): Observable<any> {
    console.log(user);
    return this.http.post('http://localhost:3000/auth/login', user);
  }

  register(user: any): Observable<any> {
    console.log(user);
    return this.http.post('http://localhost:3000/auth/register', user);
  }

  setToken(token: string) {
    this.cookies.set('token', token);
  }

  getToken() {
    return this.cookies.get('token');
  }

  getUserLogged(token: any) {
    return this.http.post('http://localhost:3000/auth/info-token', token);
  }

  getListUsers(userNickname: any) {
    if (!userNickname) {
      return this.http.get(`http://localhost:3000/api/usuarios-list/0`);
    }
    return this.http.get(
      `http://localhost:3000/api/usuarios-list/${userNickname}`
    );
  }

  getEmailList(email: any) {
    if (!email) {
      return this.http.get(`http://localhost:3000/api/email-list/0`);
    }
    return this.http.get(`http://localhost:3000/api/email-list/${email}`);
  }

  getUser() {
    const token = { token: this.getToken() };
    return this.getUserLogged(token).pipe(
      switchMap((result: any) => {
        const cedula = result.toString();
        return this.http.get(`http://localhost:3000/api/usuarios/${cedula}`);
      })
    );
  }
}
