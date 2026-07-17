import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from '../services/loading';
import { finalize } from 'rxjs/operators';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Turn loading on when request starts
  loadingService.show();

  return next(req).pipe(
    // Turn loading off regardless of success or failure using finalize
    finalize(() => {
      loadingService.hide();
    })
  );
};
