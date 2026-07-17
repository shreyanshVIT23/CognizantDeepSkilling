import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore, provideState } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth';
import { loadingInterceptor } from './interceptors/loading';
import { errorInterceptor } from './interceptors/error';
import { courseReducer } from './store/course/course.reducer';
import { CourseEffects } from './store/course/course.effects';
import { enrollmentReducer } from './store/enrollment/enrollment.reducer';
import { EnrollmentEffects } from './store/enrollment/enrollment.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, loadingInterceptor, errorInterceptor])),
    provideStore(),
    provideState('course', courseReducer),
    provideState('enrollment', enrollmentReducer),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideEffects(CourseEffects, EnrollmentEffects),
  ],
};
