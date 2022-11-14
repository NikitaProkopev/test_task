import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../common/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  form = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    console.log(this.authService.userValue);
    if (this.authService.userValue) {
      this.router.navigate(['posts'])
    }
  }

  login() {
    this.authService.auth(this.form.value.login, this.form.value.password).subscribe((user) => {
      if (user) {
        this.router.navigate(['posts'])
      }
    })
  }

}
