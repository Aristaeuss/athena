import { Injectable } from '@angular/core';

import { SignInData } from '../model/signInData';

import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly mockedUser = new SignInData('admin', 'admin');
  isAuthenticate = false;

  constructor(private router: Router) { }

  authenticate(signInData: SignInData): boolean {
    if(this.checkCredentials(signInData)) {
      this.isAuthenticate = true;
      this.router.navigate(['homepage']);
      return true;
    }
    this.isAuthenticate = false;
    return false;
  }

  private checkCredentials(signInData: SignInData): boolean {
    return this.checkUsername(signInData.getUsername()) && this.checkPassword(signInData.getPassword());
  }

  private checkUsername(username: String): boolean {
    return username === this.mockedUser.getUsername();
  }

  private checkPassword(password: String): boolean {
    return password === this.mockedUser.getPassword();
  }

  logout() {
    this.isAuthenticate = false;
    this.router.navigate(['']);
  }
}
