import { Injectable } from '@angular/core';
import {
  SecureLog,
  UserLogin,
  UserLoginResponse,
  UserSignup,
} from '../interface/auth/auth.interface';
import { ApiCallService } from './api-call-service';
import { ENVIRONMENT } from '../../environments/dev.environment';
import { API_PATHS } from '../utils/paths/api-paths';
import { AuthTokenService } from './auth-token.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(
    private apiService: ApiCallService,
    private tokenService: AuthTokenService
  ) {}
  isLoggedIn: boolean = false;

  userRegistration(registerData: UserSignup, response: any): void {
    try {
      this.apiService
        .post(
          `${ENVIRONMENT.backendDomain}${API_PATHS.version}${API_PATHS.auth.signup}`,
          registerData
        )
        .subscribe({
          next: (data: any) => {
            response(data);
          },
        });
    } catch (exception) {}
  }

  getSecureData(response: any): void {
    try {
      this.apiService
        .get(
          `${ENVIRONMENT.backendDomain}${API_PATHS.version}${API_PATHS.auth.secureLog}`
        )
        .subscribe({
          next: (data: SecureLog) => {
            response(data);
          },
          error: (error: any) => {
            response(error);
          },
        });
    } catch (exception) {}
  }

  loginUser(request: UserLogin, response: any): void {
    try {
      this.apiService
        .post(
          `${ENVIRONMENT.backendDomain}${API_PATHS.version}${API_PATHS.auth.login}`,
          request
        )
        .subscribe({
          next: (data: UserLoginResponse) => {
            this.tokenService.setTokens(data.token, data.refreshToken);
            response(data);
          },
          error: (error: any) => {
            response(error);
          },
        });
    } catch (exception) {}
  }

  async refreshToken(): Promise<boolean> {
    const refreshToken = this.tokenService.getRefreshToken();

    if (!refreshToken) {
      this.tokenService.clearTokens();
      return false;
    }

    try {
      const response: UserLoginResponse = await firstValueFrom(
        this.apiService.post(
          `${ENVIRONMENT.backendDomain}${API_PATHS.version}${API_PATHS.auth.refresh}`,
          {
            refreshToken,
          }
        )
      );

      this.tokenService.setTokens(response.token, response.refreshToken);
      return true;
    } catch (err) {
      this.tokenService.clearTokens();
      return false;
    }
  }
}
