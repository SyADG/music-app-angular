import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validation = [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(80),
  ]

  loginForm = new FormGroup({
    username: new FormControl('user', this.validation),
    password: new FormControl('password', this.validation)
  })
  model: any = {};
  loading = false;
  error = '';
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() { }

  checkLogin() {
    (this.authenticationService.authenticate(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        data => {
          this.router.navigate([''])
          // this.invalidLogin = false
        },
        error => {
          // this.invalidLogin = true

        }
      )
    );
  }
}
