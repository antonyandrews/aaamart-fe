import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenService {
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  private idTokenKey = 'refresh_token';
  private fromAuthKey = 'auth_from'; // 1: JWT (our own), 2: Google
  private userDataKey = 'user_data';

  setTokens(accessToken: string, refreshToken: string, idToken: string = '', authFrom: number = 1): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
    localStorage.setItem(this.idTokenKey, idToken);
    localStorage.setItem(this.fromAuthKey, authFrom.toString());
  }

  setUserData(userDetails: any): void {
    localStorage.setItem(this.userDataKey, userDetails.name);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  getIdToken(): string | null {
    return localStorage.getItem(this.idTokenKey);
  }

  getAuthFrom(): number | null {
    const auth_from = localStorage.getItem(this.fromAuthKey);
    return auth_from ? parseInt(auth_from) : 1;
  }
  
  getUserName(): string | null {
    return localStorage.getItem(this.userDataKey);
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  isGoogleTokenExpired(): boolean {
    const token = this.getIdToken();
    if (!token) return true;

    const payloadBase64 = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    const expiry = decodedPayload.exp * 1000; // convert to ms
    return Date.now() > expiry;
  }

  decodeJwtPayload<T = any>(): T | null {
    try {
      const token = this.getAccessToken();
      const payload = token ? token.split('.')[1] : '';
      const decoded = atob(payload);
      return JSON.parse(decoded) as T;
    } catch (error) {
      console.error('Invalid JWT token:', error);
      return null;
    }
  }

  clearTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    window.location.href = '#/login';
  }
}
