// src/app/core/services/logger.service.ts
import { Injectable } from '@angular/core';
import { ApiCallService } from '../../service/api-call-service';
import { ENVIRONMENT } from '../../../environments/dev.environment';
import { API_PATHS } from '../../utils/paths/api-paths';
import { NotificationService } from './notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LoggerService {

  constructor(private apiService: ApiCallService, private notify: NotificationService) {}

  logError(context: string, error: any): void {
    const payload = {
      level: 'error',
      context,
      message: error instanceof HttpErrorResponse ? error.message : String(error),
      status: error instanceof HttpErrorResponse ? error.status : String(error),
      statusText: error instanceof HttpErrorResponse ? error.statusText : String(error),
      stack: error instanceof Error ? error.stack : '',
    };

    try {
      this.apiService
        .post(
          `${ENVIRONMENT.backendDomain}${API_PATHS.version}${API_PATHS.log.logs}`,
          payload
        )
        .subscribe({
          next: (data: any) => {
            if (context.includes('auth/login')) {
              this.notify.showError(payload.status == 401 ? 'Invalid user credentials' : 'Cannot able to login. Please try again');
            }
          },
          error: (error: any) => {

          },
        });
    } catch (exception) {}
  }
}
