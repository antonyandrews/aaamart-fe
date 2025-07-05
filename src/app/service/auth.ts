import { Injectable } from '@angular/core';
import { SecureLog, UserLogin, UserSignup } from '../interface/auth/auth.interface';
import { ApiCallService } from './api-call-service';
import { ENVIRONMENT } from '../../environments/dev.environment';
import { API_PATHS } from '../utils/paths/api-paths';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(
    private apiService: ApiCallService
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
      this.apiService.get(`${ENVIRONMENT.backendDomain}${API_PATHS.version}${API_PATHS.auth.secureLog}`).subscribe({
        next: (data: SecureLog) => {
          response(data);
        },
        error: (error: any) => {
          response(error);
        }
      })
    } catch (exception) {}
  }

  loginUser(request: UserLogin, response: any): void {
    try {
      this.apiService.post(`${ENVIRONMENT.backendDomain}${API_PATHS.version}${API_PATHS.auth.login}`, request).subscribe({
        next: (data: SecureLog) => {
          response(data);
        },
        error: (error: any) => {
          response(error);
        }
      })
    } catch (exception) {}
  }
}
