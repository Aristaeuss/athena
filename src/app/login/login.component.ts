import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth/auth.service';
import { SignInData } from '../model/signInData';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isFormInvalid = false;
  areCredentialsInvalid = false;

  constructor(private authService: AuthService) { }

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
    }
  }

}
