import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrowserStorageService } from './../../../shared/services/browser-storage.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({})
  constructor(
    public authService: AuthService,
    public router: Router,
    public browserStorageService: BrowserStorageService,
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  onLoginUser() {
    if(this.loginForm.invalid) return;
    this.authService.login(this.loginForm.value).subscribe((res: any)=> {
      if(res) {
        this.authService.isLogin.next(true);

        this.browserStorageService.saveDataToLocalStorage('token', res.token);
        this.browserStorageService.saveDataToLocalStorage('user', res.user);
        this.browserStorageService.saveDataToLocalStorage('timeOutDuration', res.timeOutDuration);
        this.router.navigate(['/one-to-one-chat'])
      }
    })
  }

}
