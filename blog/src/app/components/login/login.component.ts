import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message: any = [];

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.message = [];
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ])],
    });
  }
  loginUser() {
    this.authService.login(this.loginForm.value).subscribe((res => {
      this.message = res;
      if (this.message.success) {
        this.authService.storeUserData(this.message.token, this.message.user);
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      }
    }));

  }

  ngOnInit() {
  }

}
