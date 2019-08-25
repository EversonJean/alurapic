import { Injectable } from '@angular/core';

const key = 'authToken';
const storage = window.localStorage;

@Injectable({ providedIn: 'root' })
export class TokenService {

  constructor() { }

  hasToken() {
    return this.getToken() != null;
  }

  setToken(token: string) {
    storage.setItem(key, token);
  }

  getToken() {
    return storage.getItem(key);

  }

  removeToken() {
    storage.removeItem(key);
  }
}
