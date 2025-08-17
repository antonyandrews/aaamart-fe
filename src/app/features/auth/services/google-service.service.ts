import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiCallService } from '../../shared/service/api-call-service';
import { ENVIRONMENT } from '../../../../environments/dev.environment';
import { API_PATHS } from '../../../utils/paths/api-paths';
import { AuthTokenService } from './auth-token.service';

@Injectable({
  providedIn: 'root',
})
export class GoogleService {

  private clientId = '767116787586-ml9cbmtcofa4fujh6os1dhp0ok1iqsc9.apps.googleusercontent.com';
  private redirectUri = `${window.location.origin}/assets/auth/callback.html`;

  constructor(private apiService: ApiCallService, private authService: AuthTokenService) { }

  signIn() {
    const scope = 'openid profile email';
    const state = crypto.randomUUID();
    sessionStorage.setItem('google_state', state);
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${this.clientId}&` +
      `redirect_uri=${encodeURIComponent(this.redirectUri)}&` +
      `response_type=code&` +
      `scope=${encodeURIComponent(scope)}&` +
      `state=${state}&` +
      `access_type=offline&` +
      `prompt=consent`;

    window.location.href = authUrl;
  }

  exchangeCodeForToken(code: any, response: any): void {
    try {
      this.apiService
        .post(
          `${ENVIRONMENT.backendDomain}${API_PATHS.version}${API_PATHS.auth.googleOauth}`,
          {
            code,
            redirectUri: this.redirectUri
          }
        )
        .subscribe({
          next: (data: any) => {
            if (data.message) {
              this.authService.setTokens(data.message.access_token, data.message.refresh_token, data.message.id_token, 2);
              this.authService.setUserData(data.user);
              response('success');
            } else {
              response('error');
            }
          },
          error: (error: any) => {
            response('error');
          },
        });
    } catch (exception) { }
  }

}
