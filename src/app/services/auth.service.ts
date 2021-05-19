import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private token: any = null

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.post<{token: string, name: string}>('api/auth/login', user)
      .pipe(
        tap(({token, name}: any) => {
          localStorage.setItem('auth-token', token)
          this.setToken(token)
        })
      )
  }

  getUser() {
    return this.http.get<User>('api/auth/user')
  }

  setToken(token: string|null) {
    this.token = token
  }

  getToken() {
    return this.token
  }

  isAuth() {
    return !!this.token
  }

  logout() {
    this.setToken(null)
    localStorage.clear()
  }

}
