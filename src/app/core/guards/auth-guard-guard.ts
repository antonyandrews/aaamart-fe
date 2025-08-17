import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthTokenService } from '../../features/auth/services/auth-token.service';
import { Auth } from '../../features/auth/services/auth';

export const AUTH_GUARD: CanActivateFn = async (route, state) => {
  const tokenService = inject(AuthTokenService);
  const authService = inject(Auth);

  const token = tokenService.getAccessToken();
  const refresh = tokenService.getRefreshToken();

  if (!token || !refresh) {
    tokenService.clearTokens();
    return false;
  }
  
  switch (tokenService.getAuthFrom()) {
    case 2:
      if (!tokenService.isGoogleTokenExpired()) {
        return true;
      }
      break;
    default:
      if (!tokenService.isTokenExpired(token)) {
        return true;
      } else {
        return await authService.refreshToken();
      }
  }
  return true;
};
