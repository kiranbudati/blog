import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';

import 'rxjs/add/operator/map';
@Injectable()
export class AuthService {
  authToken; user; options;

  serverUrl = 'http://localhost:8000';
  constructor(private http: HttpClient) { }

  createAuthHeaders() {
    this.loadToken();
    this.options = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': this.authToken});
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  register(user) {
    return this.http.post('http://localhost:3000/authentication/register', user);
    // return this.http.post('https://kiran-blog.herokuapp.com/authentication/register', user);
  }
  login(user) {
    return this.http.post('http://localhost:3000/authentication/login', user);
  }
  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user.userId);
  }
  getProfile() {
    this.createAuthHeaders();
    return this.http.get('http://localhost:3000/authentication/profile', {headers: this.options});
  }
  loggedIn() {
    return tokenNotExpired();
  }
  logout() {
    localStorage.clear();
    this.authToken = null;
  }
}
