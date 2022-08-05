import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup = new FormGroup({})
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  onCreateUser() {
    if(this.signupForm.invalid) return;
    this.authService.signup(this.signupForm.value).subscribe(res=> {
      if(res) {
        this.router.navigate(['/login']);
      }
    })
  }

}
