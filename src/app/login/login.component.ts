import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SignInData } from '../model/signInData';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    username?: FormControl;
    capgeminiLogo ="/assets/images/logo_branco_capgemini.png";
    athenaLogo ="/assets/images/logo_branco_athena_small.png";

    loginForm = new FormGroup({
        username: new FormControl('',[Validators.required, Validators.minLength(4)])
    })

    isFormInvalid = false;
    areCredentialsInvalid = false;

    constructor(private authService: AuthService,
      private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(signInForm: NgForm) {
    if (!signInForm.valid) {
      this.isFormInvalid = true;
      this.areCredentialsInvalid = false;
      return;
    }
    this.checkCredentials(signInForm);
  }

  private checkCredentials(signInForm: NgForm) {
    const signInData = new SignInData(signInForm.value.username, signInForm.value.password);
    if (!this.authService.authenticate(signInData)) {
      this.isFormInvalid = false;
      this.areCredentialsInvalid = true;
    } else {
      this.router.navigate(['homepage']);
    }
  }


}
