import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EnrollmentService } from '../../services/enrollment';
import { EnrollmentActions } from './enrollment.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class EnrollmentEffects {
  private actions$ = inject(Actions);
  private enrollmentService = inject(EnrollmentService);

  loadEnrollments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentActions.loadEnrollments),
      mergeMap(() =>
        this.enrollmentService.getEnrollments().pipe(
          map((enrollments) => {
            const enrolledCourseIds = enrollments.map((e) => Number(e.courseId));
            return EnrollmentActions.loadEnrollmentsSuccess({ enrolledCourseIds });
          }),
          catchError((error) =>
            of(
              EnrollmentActions.loadEnrollmentsFailure({
                error: error.message || 'Failed to load enrollments.',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  enroll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentActions.enrollInCourse),
      mergeMap(({ courseId }) =>
        this.enrollmentService.enroll(courseId).pipe(
          map(() => EnrollmentActions.enrollInCourseSuccess({ courseId })),
          catchError((error) =>
            of(
              EnrollmentActions.enrollInCourseFailure({
                error: error.message || 'Failed to enroll in course.',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  unenroll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentActions.unenrollFromCourse),
      mergeMap(({ courseId }) =>
        this.enrollmentService.unenroll(courseId).pipe(
          map(() => EnrollmentActions.unenrollFromCourseSuccess({ courseId })),
          catchError((error) =>
            of(
              EnrollmentActions.unenrollFromCourseFailure({
                error: error.message || 'Failed to unenroll from course.',
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
