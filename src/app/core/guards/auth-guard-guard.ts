import { CanActivateFn } from '@angular/router';
import { AuthTokenService } from '../../service/auth-token.service';
import { inject } from '@angular/core';
import { Auth } from '../../service/auth';

export const AUTH_GUARD: CanActivateFn = async (route, state) => {
  const tokenService = inject(AuthTokenService);
  const authService = inject(Auth);

  const token = tokenService.getAccessToken();
  const refresh = tokenService.getRefreshToken();

  if (!token || !refresh) {
    tokenService.clearTokens();
    return false;
  }

  if (!tokenService.isTokenExpired(token)) {
    return true;
  }

  // Token expired, try refresh
  const success = await authService.refreshToken();
  return true;
};
