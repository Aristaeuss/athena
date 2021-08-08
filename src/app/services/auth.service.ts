import { Injectable } from '@angular/core';

import { SignInData } from '../model/signInData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly mockedUser = new SignInData('admin', 'admin');
  isAuthenticate = false;

  constructor() { }

  authenticate(signInData: SignInData): boolean {
    if(this.checkCredentials(signInData)) {
      this.isAuthenticate = true;
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

  logout(): void {
    this.isAuthenticate = false;
  }
}
