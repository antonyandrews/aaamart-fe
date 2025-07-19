import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenService {
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
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
