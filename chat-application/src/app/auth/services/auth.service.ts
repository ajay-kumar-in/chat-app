import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;  // URL to web api
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  isLogin = new Subject<boolean>();
  $isUserLoggedIn = this.isLogin.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  signup(signupData: any) {
    return this.http.post(`${this.baseUrl}/signup`, signupData, this.httpOptions);
  }

  login(loginData: any) {
    return this.http.post(`${this.baseUrl}/login`, loginData, this.httpOptions);
  }

  getUsers() {
    return this.http.get(`${this.baseUrl}/users`, this.httpOptions)
  }
  
}
