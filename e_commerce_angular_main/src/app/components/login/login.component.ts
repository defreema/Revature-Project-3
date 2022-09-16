import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { loginInfo } from 'src/app/models/logininfo';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', Validators.required)
  })
  
  usedLoginInfo: loginInfo = {
    email: '',
    password: ''
  }
  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  
  onSubmit(): void {
    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe(
      () => {
        this.authService.loggedIn=true;
      },
      (err) => console.log(err),
      () => this.router.navigate(['home'])
    );
    // console.log(this.loginForm.get('email')?.value)
    // console.log(this.loginForm.get('password')?.value)
    this.usedLoginInfo.email = this.loginForm.get('email')?.value;
    this.usedLoginInfo.password = this.loginForm.get('password')?.value;
    // console.log(this.usedLoginInfo);
    localStorage.setItem('usedLoginInfo',JSON.stringify(this.usedLoginInfo));
    // console.log(localStorage.getItem('usedLoginInfo'));
  }

  register(): void {
    this.router.navigate(['register']);
  }

}
