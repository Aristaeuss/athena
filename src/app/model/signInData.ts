export class SignInData {
  private username: String;
  private password: String;

  constructor(username: String, password: String) {
    this.username = username;
    this.password = password;
  }

  getUsername(): String {
    return this.username;
  }

  getPassword(): String {
    return this.password;
  }
}
