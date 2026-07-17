import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = 'mock-auth-token-12345';

  // Clone the request and add the Authorization header
  const clonedRequest = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  console.log('[Auth Interceptor] Attached auth token to outgoing request:', clonedRequest.url);

  return next(clonedRequest);
};
