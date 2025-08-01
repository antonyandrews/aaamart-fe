// src/app/core/services/logger.service.ts
import { Injectable } from '@angular/core';
import { ApiCallService } from '../../service/api-call-service';
import { ENVIRONMENT } from '../../../environments/dev.environment';
import { API_PATHS } from '../../utils/paths/api-paths';
import { NotificationService } from './notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  constructor(
    private apiService: ApiCallService,
    private notify: NotificationService
  ) {}

  logError(context: string, error: any): void {
    const payload = {
      level: 'error',
      context,
      message:
        error instanceof HttpErrorResponse ? error.message : String(error),
      status: error instanceof HttpErrorResponse ? error.status : String(error),
      statusText:
        error instanceof HttpErrorResponse ? error.statusText : String(error),
      stack: error instanceof Error ? error.stack : '',
      actualError:
        error instanceof HttpErrorResponse
          ? error.error?.message
          : String(error),
    };

    try {
      this.apiService
        .post(
          `${ENVIRONMENT.backendDomain}${API_PATHS.version}${API_PATHS.log.logs}`,
          payload
        )
        .subscribe({
          next: (data: any) => {
            switch (payload.status) {
              case 401:
                this.notify.showError(
                  'You are not authorized to see this page.'
                );
                break;
              case 500:
                if (context.includes('api/users')) {
                  this.notify.showError(
                    payload.actualError.toLowerCase().includes('duplicate')
                      ? 'You are using registered emailid. Please login to continue'
                      : ''
                  );
                }
                break;
            }
          },
          error: (error: any) => {},
        });
    } catch (exception) {}
  }
}
