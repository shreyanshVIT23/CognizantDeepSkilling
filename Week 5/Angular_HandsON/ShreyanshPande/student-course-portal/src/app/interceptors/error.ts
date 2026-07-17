import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('[Global Error Interceptor] Intercepted HTTP Failure:', error);

      if (error.status === 401) {
        // Redirect to homepage/login page
        console.warn('[Global Error Interceptor] 401 Unauthorized - Redirecting...');
        router.navigate(['/']);
        notificationService.add('Session expired. Please log in again.');
      } else if (error.status === 500) {
        // Server error
        notificationService.add('Internal Server Error. Please contact administrator.');
      } else if (error.status === 0) {
        // Server offline
        notificationService.add('Cannot connect to the server. Please verify your network.');
      } else {
        // Fallback message
        notificationService.add(error.message || 'An unexpected HTTP error occurred.');
      }

      // Propagate the error so components/services still know the request failed
      return throwError(() => error);
    }),
  );
};
