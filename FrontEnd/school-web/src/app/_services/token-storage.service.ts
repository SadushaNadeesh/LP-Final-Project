import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const TEST_KEY = 'test-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    //alert("This is from token storage: "+token);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    //alert("This is from save user: "+JSON.stringify(user));
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public testInfo(pId: any): void {
    //alert("This is from save user: "+JSON.stringify(user));
    window.sessionStorage.setItem(TEST_KEY, JSON.stringify(pId));
  }

  public getTestInfo(): any {
    //alert("This is from save user: "+JSON.stringify(user));
    // return window.sessionStorage.getItem(TEST_KEY);

    const user = window.sessionStorage.getItem(TEST_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};

  }

}
