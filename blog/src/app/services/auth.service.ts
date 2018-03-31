import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  serverUrl = 'http://localhost:8000';
  constructor(private http: HttpClient) { }

  register(user) {
    console.log(user);
    return this.http.post('http://localhost:3000/authentication/register', user);
    // return this.http.post('https://kiran-blog.herokuapp.com/authentication/register', user);
  }
}
